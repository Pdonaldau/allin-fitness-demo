# CURRENT — All In Fitness demo site

_Updated 2026-10-13. Live site last verified 2026-10-02 (blue + founders change not yet pushed)._

**Live demo:** https://pdonaldau.github.io/allin-fitness-demo/ (GitHub Pages, public repo
`Pdonaldau/allin-fitness-demo`, deploys from `main` root on every push). A `noindex` meta tag
in `index.html` keeps the demo out of search results — remove it at go-live.

## Goal

All In Fitness (Blessington, Co. Wicklow) accepted the offer on 2026-10-13: the website
in exchange for two memberships (Paul and his son). Now refining the demo into the real
site while the gym gets its `.ie` domain.

## State

- Static one-page site: `index.html`, `styles.css`, `app.js`, `data.js`. No build step,
  no forms, no backend.
- **All content is in `data.js`.** `app.js` renders it. Edit content only in `data.js`.
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
- `demo: true` shows a striped banner and "sample" notes. Set it to `false` when real
  content is in.
- Checked locally on 2026-10-02 at 1440px and 390px: no console errors, no horizontal
  scroll, the lightbox opens and closes, and the map pins the gym.

## Real vs placeholder

| Real (public sources, the gym's photos, or their Glofox) | Placeholder — get from the gym |
|---|---|
| Address, phone, opening hours, logo, photos | Class timetable (partly matches their posts) |
| 3,750 sq ft, est. 2019, GAA link, running club | Exact equipment brands and counts |
| Prices, from Glofox memberships (checked 2026-10-13) | Instagram URL |
| Glofox links: "Book a class" opens classes, "Join now" opens memberships | |
| Facebook URL | |

**Glofox** (`glofox` in `data.js`, branch `5d1b81034602ae00a6331853`) is where people
book, register, buy memberships and fill in forms. The site only links to it. The portal
also lists their real classes (All In Strength, All In Conditioning, All In Hybrid, HYROX,
Men's Boxing, Ladies' Boxing, Small Group Training) and trainers (Eamonn Blake, Jordan
Lynch, Dan Courtney, Aidan King, Robyn Nolan). The Classes card lists these. The timetable
is still a placeholder with made-up class names.

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

1. Collect the placeholder items above from the gym. The timetable could be replaced
   by a link to Glofox, which is always current.
2. When the gym has the `.ie` domain: add it under the repo's Pages settings and send
   them the DNS records.
3. At go-live: set `demo: false` and remove the `noindex` tag.

`gh` CLI is installed but not logged in. Pushing works through git's stored credentials.
