# All In Fitness — website

A static one-page site for All In Fitness, Blessington. There is no build step, and
it runs on any static host.

## Editing content

Every piece of content is in `data.js`: hours, prices, classes, timetable, equipment,
coaches, social links and the booking link. Change the values there, save, and refresh
the page. Do not edit `app.js` to change content.

## Adding photos

Put the original images in `Assets/`, add crop boxes for them in
`tools/build_images.py`, and run:

```powershell
py -3 tools/build_images.py
```

This writes web-sized `.webp` files to `img/`. Then list them under `gallery` in
`data.js`.

## Previewing locally

Open `index.html` in a browser. Everything works except the map, which may need a real
web address in some browsers.

## Deploying

**Netlify Drop (quickest, no account needed for a preview):** go to
<https://app.netlify.com/drop> and drag this folder onto the page.

**GitHub Pages:**

1. Push this repo to GitHub.
2. In the repo, open **Settings > Pages**.
3. Under **Source**, pick the `main` branch and the root folder, then save.

To use the gym's own domain, add it under **Custom domain** on either host and point
the domain's DNS records at the host, as the host's instructions describe.

## Going live

1. Replace every placeholder in `data.js` (search for `PLACEHOLDER` and `€XX`).
2. Set `bookingUrl` to the gym's Glofox link and add the Instagram URL.
3. Swap the 206px thumbnails in `img/` for full-size photos from the gym.
4. Set `demo: false` in `data.js`.
