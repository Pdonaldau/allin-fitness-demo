# CURRENT — All In Fitness demo site

_Updated 2026-10-02. Not deployed yet._

## Goal

Offer All In Fitness (Blessington, Co. Wicklow) a website in exchange for memberships
for Paul and his son. The first step is a demo good enough to show on a phone.

## State

- Static one-page site: `index.html`, `styles.css`, `app.js`, `data.js`. No build step,
  no forms, no backend.
- **All content is in `data.js`.** `app.js` renders it. Edit content only in `data.js`.
- **Design (v2):** built on the gym's own brand. Their logo is a circular badge with
  playing-card suits ("All In" is a poker reference), and their Facebook posts are black
  and white. The site uses black and white with card red (`--red` in `styles.css`), the
  Outfit font, class cards drawn as playing cards, a news ticker, a photo grid with a
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

| Real (public sources or the gym's photos) | Placeholder — get from the gym |
|---|---|
| Address, phone, opening hours, logo, photos | Prices (`€XX`) |
| 3,750 sq ft, est. 2019, GAA link, running club | Class timetable (partly matches their posts) |
| Class types; boxing Tue evenings, yoga Thu mornings, strength Tue & Thu | Exact equipment brands and counts |
| Facebook URL | Instagram URL, Glofox booking link (`#`) |

Coach names and roles come from a 2020 article. Confirm them. The two people in the
birthday photo are not named on the site, because we don't know who they are.

## Next step

Deploy to a free preview URL (Netlify Drop) so Paul can show it on a phone. Then pitch.
If the gym agrees, collect the placeholder items above, buy a `.ie` domain, and set
`demo: false`.
