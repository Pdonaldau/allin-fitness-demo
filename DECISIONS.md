# DECISIONS — superseded choices and why

Newest first. `CURRENT.md` holds what is true now; this file keeps the reasoning for
what it replaced.

## 2026-10-13 — Demo banner and placeholder notes removed

- **Was:** `demo: true` in `data.js` showed a striped "Demo site" banner and yellow
  notes such as "From the gym's photos. Brands and counts to be confirmed."
- **Now:** removed from the markup, code and CSS, so the gym reviews a clean site.
  Unconfirmed content is still marked `placeholder: true` in `data.js`.

## 2026-10-13 — Timetable removed

- **Was:** a weekly timetable table (placeholder times and class names), a "Timetable"
  menu link, and news items naming class days ("Boxing is back on Tuesday evenings",
  "Strength class blocks every Tuesday & Thursday").
- **Now:** no class times anywhere. The gym wants times given on request, so the
  Classes card says to ask and its button goes to the contact section.

## 2026-10-13 — Class section: six cards became two

- **Was:** six playing cards, one per class (BETA, Strength, HIIT, Conditioning, Boxing,
  Yoga). On phones they took about 2,040px to scroll past, so they were first shrunk to
  two compact cards per row (758px).
- **Yoga:** the gym asked that the Yoga card become "More classes — enquire", because
  specialist classes change often.
- **Now:** two cards, Training first and then Classes. Jordan said the gym wants to be
  known as a training gym. The class names now come from their Glofox portal, and the
  card tells people the line-up changes.

## 2026-10-13 — Card red became blue

- **Was:** card red (`--red`, `#e0192d`), from the playing-card theme.
- **Now:** blue (`--accent`, `#1e5eff`), at the gym's request.

## 2026-10-13 — Team section cut to the founders

- **Was:** four people from a 2020 article (Eamonn Blake, Jordan Lynch, Kevin Cooney,
  Amy Burke).
- **Now:** only the co-founders, Eamonn Blake and Jordan Lynch, at the gym's request.

## 2026-10-13 — Placeholder prices replaced

- **Was:** three invented plans (Gym Only, Go All In, Class Pack) at `€XX`.
- **Now:** the gym's real plans from their Glofox memberships page.

## 2026-10-13 — Gym's change requests (round 1)

- **Hero line:** was "Blessington's biggest gym" (a size claim like the one they
  rejected). Now "Blessington's best equipped gym", their wording.
- **Hero intro:** was "5,000 sq ft of serious kit…". Now the gym's text naming the
  machine brands.
- **Top buttons:** "Book a class" in the nav and hero went to Glofox classes. Now both
  say "Membership options" and jump to `#prices`. The gym wanted "Book a class" further
  down, so it is on the Classes card (to Glofox) and the bottom CTA band. The nav
  "Prices" link was dropped as a duplicate.
- **Classes card button:** was "Enquire about classes" to `#visit`. Now "Book a class"
  to Glofox. Still no class times on the site itself.
- **Training card button:** was "Enquire about training". Now "Other services
  available", still to `#visit`.
- **Equipment:** was a guess from photos (plate-loaded, free weights, cardio deck,
  boxing wall). Now brands by machine type, from the gym.
- **Team:** was the two co-founders only. Now the founders plus Dan Courtney, Robyn
  Nolan, Aidan King and Shane O'Connor, from the gym.
- **Community:** "Running club" removed. "Blessington GAA partner" became "Proud
  Blessington GAA Club sponsor", and "Proud Blessington AFC sponsor" was added.
- **Gallery tile:** "More on Facebook" became "More on Instagram". The footer still
  links both.

## 2026-10-13 — Production hosting moves to the DigitalOcean server

- **Was:** GitHub Pages with the gym's `.ie` as a custom domain (four GitHub A
  records plus a `www` CNAME).
- **Now:** Paul's shared DigitalOcean server, with nginx serving the static files and
  a Let's Encrypt certificate. The domain stays on Blacknight's nameservers with two A
  records pointing at the server. Cloudflare was considered and dropped: it would put
  the gym's whole DNS in Paul's account, and its HTML caching would get in the way of
  reviewing changes on the live site. GitHub Pages stays as the review copy until
  go-live.

## 2026-10-16 — Registrar is Register365, not Blacknight

- **Was:** the plan assumed the gym would buy the `.ie` at Blacknight.
- **Now:** the gym registered `allinfitness.ie` at Register365. The approach is the
  same: it stays on the registrar's own nameservers, with two A records pointing at
  the server.
