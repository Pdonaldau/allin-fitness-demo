# All In Fitness — website

A static one-page site for All In Fitness, Blessington. It runs on any static host.

## Editing content

Every piece of content is in `data.js`: hours, prices, training and classes, FAQ,
equipment, coaches, social links and the Glofox links. Change the values there, save,
and refresh the page. Do not edit `app.js` to change content.

After any change to `data.js`, `index.html` or `app.js`, run:

```powershell
py -3 tools/prerender.py
```

This writes the rendered page into `index.html` as plain HTML and regenerates
`llms.txt`. Google runs JavaScript, but most AI crawlers don't; without this step they
see an almost empty page. If you forget, the site still works for visitors, but
crawlers see the old content. The script needs Playwright
(`py -3 -m pip install playwright`, then `py -3 -m playwright install chromium`).

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

1. Replace every placeholder in `data.js` (search for `PLACEHOLDER` and `placeholder: true`).
2. Check the Glofox and social links in `data.js` still work.
3. Swap the 206px thumbnails in `img/` for full-size photos from the gym.
4. Run `py -3 tools/prerender.py`.
