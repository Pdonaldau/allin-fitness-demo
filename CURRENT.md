# CURRENT — All In Fitness website

_Updated 2026-10-13 (gym's change requests applied). Live site last verified 2026-10-13 at commit `e189b0f`._

**Live site:** https://pdonaldau.github.io/allin-fitness-demo/ (GitHub Pages, public repo
`Pdonaldau/allin-fitness-demo`, deploys from `main` root on every push, live in about a
minute). A `noindex` meta tag in `index.html` keeps it out of search results until the
`.ie` is live.

## Uncommitted work — check `git status` first

Two batches are made locally but **not committed or pushed** (Paul hadn't said to yet):

- Removed the "Largest gym in west Wicklow" claim; FAQ now says parking is free.
- The gym's first round of change requests (9 items, listed in `DECISIONS.md` under
  "Gym's change requests (round 1)"): new hero line and intro, "Membership options"
  buttons at the top, "Book a class" moved to the Classes card, real equipment brands,
  full team, GAA and AFC sponsor items, Instagram gallery tile.
- Prerender already run, so `index.html` and `llms.txt` match.

Ask Paul before committing and pushing. He reviews every change on the live site, so
after a change, offer to commit and push.

## Goal

All In Fitness (Blessington, Co. Wicklow) accepted the offer on 2026-10-13: the website
in exchange for two memberships (Paul and his son). The site is now in front of the gym
for feedback, while they buy their `.ie` domain.

## Open questions (waiting on Paul or the gym)

1. **Gym feedback** on the live site. Paul is collecting it.
2. **Brand spellings.** The gym wrote "Lifefitness", "Concept" and "Gymgear"; the site
   says Life Fitness, Concept2 and Gym Gear. Confirm "Concept" means Concept2.
3. **Full-size photos and a vector logo.** Some images are 206px thumbnails from Facebook.
4. **Google Business Profile:** who manages it, so the site link goes on it at go-live.

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
| Address, phone, opening hours, logo, photos | Concept2 spelling (see open questions) |
| 5,000 sq ft, est. 2019, free parking, GAA and AFC sponsorship | |
| Hero line, intro, equipment brands and team, from the gym | |
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
- **Domain:** the gym buys and owns the `.ie` in its name. Paul sends the DNS records
  (GitHub Pages A records + `www` CNAME) or is given access to add them.

## Next steps

1. Act on the gym's feedback when Paul brings it.
2. When the gym has the `.ie`: add it under the repo's Pages settings and send them the
   DNS records.
3. At go-live: set `siteUrl` in `data.js` to the `.ie`, remove the `noindex` tag, make
   `og:image` an absolute URL, add a canonical link, `robots.txt` and `sitemap.xml`,
   then run `py -3 tools/prerender.py`.
4. After go-live: verify the domain in Google Search Console, submit the sitemap, and
   ask the gym to put the site link on their Google Business Profile.

History of superseded choices is in `DECISIONS.md`. `gh` CLI is installed but not logged
in. Pushing works through git's stored credentials.
