# CURRENT — All In Fitness demo site

_Updated 2026-10-13. Live site last verified 2026-10-13._

**Live demo:** https://pdonaldau.github.io/allin-fitness-demo/ (GitHub Pages, public repo
`Pdonaldau/allin-fitness-demo`, deploys from `main` root on every push). A `noindex` meta tag
in `index.html` keeps the demo out of search results — remove it at go-live.

## Goal

All In Fitness (Blessington, Co. Wicklow) accepted the offer on 2026-10-13: the website
in exchange for two memberships (Paul and his son). Now refining the site into the real
site while the gym gets its `.ie` domain.

## State

- Static one-page site: `index.html`, `styles.css`, `app.js`, `data.js`. One prerender step,
  no forms, no backend.
- **All content is in `data.js`.** `app.js` renders it. Edit content only in `data.js`.
- **Prerender after every change:** `py -3 tools/prerender.py` runs `app.js` in headless
  Chromium and writes the result into `index.html`, plus `llms.txt`. AI crawlers don't
  run JavaScript, so a stale `index.html` means they see old content. Running it twice
  gives the same file. `index.html` is both the template and the output.
- **SEO / AI groundwork (done 2026-10-13):** prerendered HTML, structured data
  (`ExerciseGym` with founders, prices and hours, plus `FAQPage`) baked into the head,
  an FAQ section (`faq` in `data.js`), and `llms.txt`. Domain-dependent steps wait for
  the `.ie` (see Next step).
- **Design (v2):** built on the gym's own brand. Their logo is a circular badge with
  playing-card suits ("All In" is a poker reference), and their Facebook posts are black
  and white. The site uses black and white with a blue accent (`--accent` in `styles.css`,
`#1e5eff`; the gym asked for blue instead of red on 2026-10-13), the
  Outfit font, two playing cards (Training first, then Classes; Jordan said they want
  to be known as a training gym), a news ticker, a photo grid with a
  lightbox, a spinning logo in the hero, and scroll animations. All motion turns off
  under `prefers-reduced-motion`.
- **Images:** the originals Paul took from Facebook are in `Assets/`. `tools/build_images.py`
  crops out the text baked into the posters and writes web-sized files to `img/`, plus
  `img/logo.png` cut from a post. Re-run it with `py -3 tools/build_images.py` after
  adding images. `Allin3/4/8/9.jpg` are only 206px thumbnails, and 4 and 9 are the
  same picture. Ask the gym for full-size photos and a vector logo.
- **News ticker:** items in `data.js` → `news` hide after their `until` date. The free
  trial weekend item expires after 2026-10-04.
- **No demo banner or placeholder notes** (removed 2026-10-13 before showing the gym).
  The equipment list is still unconfirmed; `placeholder: true` in `data.js` tracks it,
  but nothing on the page says so.
- Checked locally on 2026-10-02 at 1440px and 390px: no console errors, no horizontal
  scroll, the lightbox opens and closes, and the map pins the gym.

**Personal training is enquiry only.** One-to-one PT is run by the individual trainers,
not the gym, so the Training card's button goes to the contact section, never to Glofox.

**No class times on the site.** The gym wants class days and times given on request.
There is no timetable section, and the Classes card's button goes to the contact
section. Don't add times to the cards, the ticker, or the news items.

## Real vs placeholder

| Real (public sources, the gym's photos, or their Glofox) | Placeholder — get from the gym |
|---|---|
| Address, phone, opening hours, logo, photos | Exact equipment brands and counts |
| 5,000 sq ft (gym confirmed 2026-10-13), est. 2019, GAA link, running club | |
| Prices, from Glofox memberships (checked 2026-10-13) | |
| Glofox links: "Book a class" opens classes, "Join now" opens memberships | |
| Facebook and Instagram (@aif_blessington) URLs | |

**Glofox** (`glofox` in `data.js`, branch `5d1b81034602ae00a6331853`) is where people
book, register, buy memberships and fill in forms. The site only links to it. The portal
also lists their real classes (All In Strength, All In Conditioning, All In Hybrid, HYROX,
Men's Boxing, Ladies' Boxing, Small Group Training) and trainers (Eamonn Blake, Jordan
Lynch, Dan Courtney, Aidan King, Robyn Nolan). The Classes card lists these class names.

The team section shows only the two co-founders, Eamonn Blake and Jordan Lynch, at the
gym's request. Glofox confirms the spelling "Eamonn". The two people in the birthday photo
are not named on the site, because we don't know who they are.

## Scope

The deal terms, pitch deck link and price anchor are in `DEAL.local.md`. That file is
gitignored because this repo is public. Never put them in a committed file.

- **Out of scope:** booking system and email. The site only links to their Glofox and
  their own email.
- **Domain:** the gym buys and owns the `.ie` in its name. Paul sends the DNS records
  (GitHub Pages A records + `www` CNAME) or is given access to add them.

## Next step

1. Paul is showing the site to the gym (2026-10-13) for feedback. Collect their changes
   and the placeholder items above.
2. When the gym has the `.ie` domain: add it under the repo's Pages settings and send
   them the DNS records.
3. At go-live: set `siteUrl` in `data.js` to the `.ie`, remove the
   `noindex` tag, make `og:image` an absolute URL, add a canonical link, `robots.txt`
   and `sitemap.xml`, then run `py -3 tools/prerender.py`.
4. After go-live: verify the domain in Google Search Console, submit the sitemap, and
   ask the gym to put the site link on their Google Business Profile.

`gh` CLI is installed but not logged in. Pushing works through git's stored credentials.
