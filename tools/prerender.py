"""Bake the rendered page into index.html and write llms.txt.

The site is drawn by app.js from data.js. Google runs JavaScript, but most AI
crawlers do not, so without this they see an almost empty page. This script
opens index.html in headless Chromium, lets app.js render it, and writes the
result back into index.html as plain HTML. app.js still runs in the browser
and redraws everything, so the page behaves exactly as before.

Run after every change to data.js, index.html or app.js:

    py -3 tools/prerender.py

Needs Playwright: py -3 -m pip install playwright; py -3 -m playwright install chromium
"""

import re
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
LLMS = ROOT / "llms.txt"

# Undo anything app.js sets that depends on the moment the page was rendered
# (time of day, scroll position, animations), so the saved HTML stays neutral.
CLEANUP_JS = """
() => {
  document.querySelectorAll('.reveal.in').forEach((el) => el.classList.remove('in'));
  document.querySelectorAll('.today').forEach((el) => el.classList.remove('today'));
  document.querySelectorAll('.is-open, .scrolled, .nav-open').forEach((el) =>
    el.classList.remove('is-open', 'scrolled', 'nav-open'));
  const badge = document.getElementById('open-badge');
  badge.textContent = '';
  badge.hidden = true;
  document.querySelectorAll('.hero-bg').forEach((el) => el.style.removeProperty('translate'));
  document.querySelectorAll('[style=""]').forEach((el) => el.removeAttribute('style'));
  return {
    body: document.body.innerHTML,
    ld: document.getElementById('structured-data').outerHTML,
    site: window.SITE,
  };
}
"""


def render():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Reduced motion makes app.js show final numbers instead of counting up.
        page = browser.new_page(reduced_motion="reduce", timezone_id="Europe/Dublin")
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(INDEX.as_uri(), wait_until="load")
        result = page.evaluate(CLEANUP_JS)
        browser.close()
    if errors:
        raise SystemExit("app.js threw while rendering:\n" + "\n".join(errors))
    return result


def write_index(body, ld):
    html = INDEX.read_text(encoding="utf-8")
    html = re.sub(r'\s*<script[^>]*id="structured-data"[^>]*>.*?</script>', "", html, flags=re.S)
    html = html.replace("</head>", f"  {ld}\n</head>", 1)
    start = html.index(">", html.index("<body")) + 1
    end = html.rindex("</body>")
    html = html[:start] + body.rstrip() + "\n" + html[end:]
    INDEX.write_text(html, encoding="utf-8", newline="\n")


def write_llms(s):
    """A plain-text summary for AI tools (the llms.txt convention)."""
    lines = [
        f"# {s['name']}",
        "",
        f"> {s['tagline']} (Co. Wicklow, Ireland). {s['intro']}",
        "",
        "## Contact",
        f"- Address: {', '.join(s['address'])}",
        f"- Phone: {s['phone']}",
        f"- Website: {s['siteUrl']}",
        f"- Book and join online (Glofox): {s['glofox']['memberships']}",
        *[f"- {k.capitalize()}: {v}" for k, v in s["social"].items() if v],
        "",
        "## Opening hours",
        *[f"- {h['label']}: {h['open']}–{h['close']}" for h in s["hours"]],
        "",
        "## Memberships",
        *[f"- {p['name']}: {p['price']}{p['period']}. {'; '.join(p['features'])}." for p in s["prices"]["plans"]],
        f"- {s['prices']['note']}",
        "",
    ]
    for prog in s["programmes"]:
        lines += [f"## {prog['name']}", prog["text"], *[f"- {x}" for x in prog["items"]], ""]
    lines += [
        "## Team",
        *[f"- {c['name']}, {c['role']}" for c in s["coaches"]],
        "",
        "## Questions",
    ]
    for f in s["faq"]:
        lines += [f"### {f['q']}", f["a"], ""]
    LLMS.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8", newline="\n")


if __name__ == "__main__":
    r = render()
    write_index(r["body"], r["ld"])
    write_llms(r["site"])
    print(f"Wrote {INDEX.name} and {LLMS.name}")
