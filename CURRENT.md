# CURRENT — All In Fitness website

_Updated 2026-10-16. Live site last verified 2026-10-13 at commit `ea4b896`._

**Live site:** https://pdonaldau.github.io/allin-fitness-demo/ (GitHub Pages, public repo
`Pdonaldau/allin-fitness-demo`, deploys from `main` root on every push, live in about a
minute). A `noindex` meta tag in `index.html` keeps it out of search results until the
`.ie` is live.

## Latest change

The gym's first round of change requests (9 items) is live at `ea4b896`. The list is in
`DECISIONS.md` under "Gym's change requests (round 1)". Paul reviews every change on the
live site, so after a change, offer to commit and push.

## Goal

All In Fitness (Blessington, Co. Wicklow) accepted the offer on 2026-10-13: the website
in exchange for two memberships (Paul and his son). The site is now in front of the gym
for feedback, while they buy their `.ie` domain.

## Open questions (waiting on Paul or the gym)

1. **Gym feedback** on the live site. Paul is collecting it.
2. **Full-size photos and a vector logo.** Some images are 206px thumbnails from Facebook.
3. **Google Business Profile:** who manages it, so the site link goes on it at go-live.

## Offered, not started (Paul hasn't said yes yet)

- Compute the "7 years" stat from `founded` so it doesn't go stale in September 2027.
- Lighthouse speed and accessibility check, then fixes.
- Prepare go-live files (canonical, `robots.txt`, `sitemap.xml`) with a placeholder domain.

## Content rules from the gym — don't break these

- **No class times anywhere.** Class days and times are given on request. No timetable,
  and none in the cards, ticker, news items or FAQ. The Classes card's "Book a class"
  button goes to Glofox, which is fine: times live there, not on this site.
- **Top of page sells membership.** Nav and hero buttons say "Membership options" and
  go to `#prices`. "Book a class" stays further down (Classes card, bottom CTA band).
- **Personal training is enquiry only.** One-to-one PT is run by the individual
  trainers, not the gym. The Training card's button goes to `#visit`, never to Glofox.
- **Never claim "largest gym in west Wicklow".** Free parking is confirmed.
- **Team** is the two co-founders, then Dan Courtney, Robyn Nolan, Aidan King and Shane
  O'Connor, with the roles the gym gave. No running club on the site.
- **Gallery "more" tile links to Instagram**, not Facebook.
- **Blue accent, no red.** `--accent` in `styles.css`, `#1e5eff`.
- Lead with **training**: Jordan said they want to be known as a training gym.

## How the site works

- Static one-page site: `index.html`, `styles.css`, `app.js`, `data.js`. No forms, no
  backend.
- **All content is in `data.js`.** `app.js` renders it. Edit content only in `data.js`.
- **Prerender after every change:** `py -3 tools/prerender.py` runs `app.js` in headless
  Chromium and writes the result into `index.html`, plus `llms.txt`. AI crawlers don't
  run JavaScript, so a stale `index.html` means they see old content. Running it twice
  gives the same file. `index.html` is both the template and the output.
- **SEO / AI groundwork (done):** prerendered HTML, structured data (`ExerciseGym` with
  founders, prices, hours and social links, plus `FAQPage`) baked into the head, an FAQ
  section (`faq` in `data.js`), and `llms.txt`.
- **Glofox** (`glofox` in `data.js`, branch `5d1b81034602ae00a6331853`) is where people
  book, register, buy memberships and fill in forms. "Book a class" opens Glofox classes
  and "Join now" opens memberships. The site only links to it. Their Glofox lists the
  classes on the Classes card and trainers Eamonn Blake, Jordan Lynch, Dan Courtney,
  Aidan King and Robyn Nolan.
- **Design:** built on the gym's brand. Their logo is a circular badge with playing-card
  suits ("All In" is a poker reference). Black and white with the blue accent, Outfit
  font, two playing cards (Training, then Classes), a ticker, a photo grid with a
  lightbox, a spinning logo in the hero, scroll animations, and an FAQ accordion. All
  motion turns off under `prefers-reduced-motion`.
- **Images:** originals are in `Assets/`. `py -3 tools/build_images.py` crops them and
  writes web-sized files to `img/`.
- **News ticker:** items in `data.js` → `news` hide after their `until` date. Only the
  expired free-trial item is left, so the ticker shows the card items.
- Checked 2026-10-13 at 1440px and 390px: no console errors, no horizontal scroll.

## Real vs unconfirmed

| Real (public sources, the gym, or their Glofox) | Unconfirmed — ask the gym |
|---|---|
| Address, phone, opening hours, logo, photos | Sponsor item lines (GAA, AFC) written by us |
| 5,000 sq ft, est. 2019, free parking, GAA and AFC sponsorship | |
| Hero line, intro, equipment brands and team, from the gym ("Concept" taken as Concept2) | |
| Prices from Glofox memberships (checked 2026-10-13) | |
| Facebook and Instagram (@aif_blessington) | |

The two people in the birthday photo are not named on the site, because we don't know
who they are.

## Scope

The deal terms, pitch deck link and price anchor are in `DEAL.local.md`. That file is
gitignored because this repo is public. Never put them in a committed file. Before any
push, check `git log origin/main..main -p` for them.

- **Out of scope:** booking system and email. The site only links to Glofox and the
  gym's phone.
- **Domain: `allinfitness.ie`**, registered 2026-10-16 at **Register365** (not
  Blacknight) by the registrant AIF Gym Ltd. It stays on Register365's nameservers
  (`ns0`/`ns1`/`ns2.reg365.net`, no Cloudflare), so the gym keeps control of its DNS and
  email. Checked 2026-10-16 14:15 UTC: registry status `pendingCreate` + `serverHold`
  (normal .ie validation), so the domain doesn't resolve publicly yet. **DNS records
  are done** (checked 2026-10-16 against all three reg365 nameservers): `A @` and
  `A www` both `165.22.21.95`, no `AAAA`. MX is Register365's default forwarding
  (`fwd0`/`fwd1`/`fwd2.hosts.co.uk`); leave it alone. The records go public when the
  hold lifts.
- **Production hosting (decided 2026-10-13): Paul's shared DigitalOcean server**, not
  GitHub Pages. The gym adds two records in Register365 DNS: `A @` and `A www`, both to
  the server's IP. TLS is Let's Encrypt via `certbot --nginx`, which renews by itself.
  - Server `165.22.21.95`. SSH login is in the gitignored `SERVER.local.md`, never in a
    committed file. nginx 1.24 (use
    `listen 443 ssl http2;`, not `http2 on;`). Verified 2026-10-13: hostname
    Bixbo-Website-New, nginx 1.24.0, certbot 2.9.0 installed.
  - The box is shared with other sites. Changes must be additive: a new nginx file
    for this site only, never edit other sites' configs.
  - The site is static, so nginx serves the files directly. No pm2, no app port.
  - **nginx site is set up (2026-10-16), HTTP only.** Config file
    `/etc/nginx/sites-available/allinfitness.ie`, symlinked in `sites-enabled`, serves
    `/var/www/allinfitness/site` (owned by `deployer`, so deploys need no sudo).
    HTML/CSS/JS/txt are `no-cache`, `img/` caches for 7 days. Security headers
    (`nosniff`, `Referrer-Policy`, `X-Frame-Options SAMEORIGIN`, `Permissions-Policy`)
    live in `/etc/nginx/snippets/allinfitness-headers.conf`, included in the server
    block and in every location block (a location's own `add_header` drops the
    server-level ones). HSTS is commented out in that snippet until the certificate
    exists. No CSP, on purpose for now. Verified 2026-10-16 on `/`, CSS, an image and
    a 404. The 3 `protocol options
    redefined` warnings in `nginx -t` come from other sites' files and were already there.
  - **Deploy:** `powershell -File tools\deploy.ps1`. It copies only `index.html`,
    `styles.css`, `app.js`, `data.js`, `llms.txt` and `img/`, then swaps the folder in
    one step. Prerender first. First deploy done 2026-10-16 (current `main` content,
    still with `noindex` and the GitHub Pages `siteUrl`). Verified with
    `curl -H "Host: allinfitness.ie" http://165.22.21.95/`: 200.
  - GitHub Pages stays as the review copy until go-live.

## Next steps

1. Act on the gym's feedback when Paul brings it.
2. When `allinfitness.ie` resolves publicly (registry hold lifted), run on the server:
   `sudo certbot --nginx -d allinfitness.ie -d www.allinfitness.ie` (choose redirect),
   then uncomment the HSTS line in the headers snippet (not in the port-80 block).
3. At go-live: set `siteUrl` in `data.js` to the `.ie`, remove the `noindex` tag, make
   `og:image` an absolute URL, add a canonical link, `robots.txt` and `sitemap.xml`,
   then run `py -3 tools/prerender.py` and `tools\deploy.ps1`.
4. After go-live: verify the domain in Google Search Console, submit the sitemap, and
   ask the gym to put the site link on their Google Business Profile.

History of superseded choices is in `DECISIONS.md`. `gh` CLI is installed but not logged
in. Pushing works through git's stored credentials.
