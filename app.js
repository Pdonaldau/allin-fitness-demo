// Renders the page from window.SITE (data.js). Content edits belong in data.js.
(function () {
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const SUITS = { spade: "♠", heart: "♥", diamond: "♦", club: "♣" };
  const isRed = (suit) => suit === "heart" || suit === "diamond";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const icons = {
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17 6a1.1 1.1 0 1 0 0 2.2A1.1 1.1 0 0 0 17 6zM21 8.1c-.1-1.6-.4-3-1.6-4.2S16.9 2.4 15.3 2.3C13.7 2.2 10.3 2.2 8.7 2.3 7.1 2.4 5.7 2.7 4.5 3.9S3 6.5 2.9 8.1c-.1 1.6-.1 6.2 0 7.8.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 5 .1 6.6 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.2-.1-7.8zm-2 9.8c-.3.9-1 1.5-1.9 1.9-1.3.5-4.4.4-5.1.4s-3.9.1-5.1-.4c-.9-.3-1.5-1-1.9-1.9-.5-1.3-.4-4.4-.4-5.9s-.1-4.6.4-5.9c.3-.9 1-1.5 1.9-1.9 1.3-.5 4.4-.4 5.1-.4s3.9-.1 5.1.4c.9.3 1.5 1 1.9 1.9.5 1.3.4 4.4.4 5.9s.1 4.6-.4 5.9z"/></svg>',
  };

  // --- Hero ---------------------------------------------------------------
  $("#hero-title").textContent = S.tagline;
  $("#hero-intro").textContent = S.intro;

  // --- Ticker: live news first, then what's on each programme card -------
  const today = new Date().toISOString().slice(0, 10);
  const news = (S.news || []).filter((n) => !n.until || n.until >= today).map((n) => n.text);
  const tickerItems = [...news, ...S.programmes.flatMap((p) => p.items)];
  const suitCycle = ["♠", "♥", "♦", "♣"];
  const tickerRun = tickerItems
    .map((t, i) => `<span class="ticker-item">${esc(t)}</span><span class="ticker-suit">${suitCycle[i % 4]}</span>`)
    .join("");
  // Two copies side by side so the loop is seamless.
  $("#ticker").innerHTML = `<div class="ticker-run">${tickerRun}</div><div class="ticker-run" aria-hidden="true">${tickerRun}</div>`;

  // --- Stats --------------------------------------------------------------
  $("#stats").innerHTML = S.stats
    .map((s, i) => {
      const value = s.count != null
        ? `<span class="count" data-count="${s.count}">${reduceMotion ? s.count.toLocaleString("en-IE") : 0}</span>`
        : esc(s.value);
      return `<div class="stat reveal" style="--i:${i}"><div class="stat-value">${value}${s.unit ? ` <small>${esc(s.unit)}</small>` : ""}</div><div class="stat-label">${esc(s.label)}</div></div>`;
    })
    .join("");

  // --- Training and classes, dealt as playing cards ----------------------
  $("#deck").innerHTML = S.programmes
    .map((c, i) => {
      const pip = SUITS[c.suit] || "♠";
      const corner = `<span>${esc(c.name[0])}</span><span>${pip}</span>`;
      return `<article class="pcard reveal${isRed(c.suit) ? " red" : ""}" style="--i:${i}">
        <div class="pcard-face">
          <div class="pc-corner tl" aria-hidden="true">${corner}</div>
          <div class="pc-corner br" aria-hidden="true">${corner}</div>
          <div class="pc-pip" aria-hidden="true">${pip}</div>
          <span class="tag">${esc(c.tag)}</span>
          <h3>${esc(c.name)}</h3>
          <p>${esc(c.text)}</p>
          <ul class="pc-list">${c.items.map((x) => `<li><i aria-hidden="true">${pip}</i>${esc(x)}</li>`).join("")}</ul>
          <a class="btn" data-booking="${esc(c.link)}" href="#">${esc(c.button)}</a>
        </div>
      </article>`;
    })
    .join("");

  // Cards tilt toward the pointer on devices with a mouse.
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".pcard").forEach((card) => {
      const face = card.querySelector(".pcard-face");
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        face.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
        face.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
        face.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
      });
      card.addEventListener("pointerleave", () => { face.style.transform = ""; });
    });
  }

  // --- Gallery + lightbox -------------------------------------------------
  $("#bento").innerHTML = S.gallery
    .map(
      (g, i) => `<button class="bento-item ${esc(g.size)} reveal" style="--i:${i}" data-src="${esc(g.src)}" data-alt="${esc(g.alt)}">
        <img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy"><span class="bento-cap">${esc(g.alt)}</span>
      </button>`
    )
    .join("") +
    (S.social.facebook
      ? `<a class="bento-item bento-more reveal" style="--i:${S.gallery.length}" href="${esc(S.social.facebook)}" target="_blank" rel="noopener">
          <span class="bento-suits" aria-hidden="true">♠♥♦♣</span><span>More on Facebook →</span></a>`
      : "");
  const lightbox = $("#lightbox");
  const lbImg = lightbox.querySelector("img");
  $("#bento").addEventListener("click", (e) => {
    const item = e.target.closest("button.bento-item");
    if (!item || typeof lightbox.showModal !== "function") return;
    lbImg.src = item.dataset.src;
    lbImg.alt = item.dataset.alt;
    lightbox.showModal();
  });
  lightbox.addEventListener("click", () => lightbox.close());

  // --- Equipment ----------------------------------------------------------
  $("#equip-photo").src = S.equipment.photo;
  $("#equip-grid").innerHTML = S.equipment.groups
    .map((g, i) => `<div class="equip reveal" style="--i:${i}"><h3>${esc(g.name)}</h3><ul>${g.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`)
    .join("");

  // --- Prices -------------------------------------------------------------
  $("#price-grid").innerHTML = S.prices.plans
    .map(
      (p, i) => `<article class="price-card reveal${p.featured ? " featured" : ""}" style="--i:${i}">
        ${p.featured ? '<span class="chip" aria-hidden="true">ALL<br>IN</span><span class="tag tag-accent">Best value</span>' : ""}
        <h3>${esc(p.name)}</h3>
        <div class="price">${esc(p.price)}<span>${esc(p.period)}</span></div>
        <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <a class="btn ${p.featured ? "" : "btn-ghost"}" data-booking="memberships" href="#">Join now</a>
      </article>`
    )
    .join("");
  $("#price-note").textContent = S.prices.note;

  // --- Glofox links: data-booking="memberships" opens memberships, "visit" jumps to
  // the contact section, and the rest open Glofox classes.
  document.querySelectorAll("[data-booking]").forEach((a) => {
    if (a.dataset.booking === "visit") { a.href = "#visit"; return; }
    const url = a.dataset.booking === "memberships" ? S.glofox.memberships : S.glofox.classes;
    if (!url) return;
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // --- Story, team, community --------------------------------------------
  const st = S.story;
  $("#story-photo").src = st.photo;
  $("#story-photo").alt = st.photoAlt;
  $("#story-year").textContent = S.founded;
  $("#story-title").textContent = st.title;
  $("#story-text").innerHTML = st.text.map((p) => `<p>${esc(p)}</p>`).join("");

  $("#coach-grid").innerHTML = S.coaches
    .map((c, i) => {
      const initials = c.name.split(" ").map((w) => w[0]).join("");
      const suit = suitCycle[i % 4];
      return `<div class="coach reveal" style="--i:${i}"><div class="avatar${i % 4 === 1 || i % 4 === 2 ? " red" : ""}" aria-hidden="true">${esc(initials)}<i>${suit}</i></div><h3>${esc(c.name)}</h3><p>${esc(c.role)}</p></div>`;
    })
    .join("");
  $("#community").innerHTML = S.community
    .map((c, i) => `<div class="community-item reveal" style="--i:${i}"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>`)
    .join("");

  // --- Hours, location, open-now badge -----------------------------------
  const now = dublinNow();
  $("#hours-table").innerHTML = S.hours
    .map(
      (h) => `<tr${h.days.includes(now.day) ? ' class="today"' : ""}><th scope="row">${esc(h.label)}</th><td>${esc(h.open)} – ${esc(h.close)}</td></tr>`
    )
    .join("");

  const badge = $("#open-badge");
  badge.hidden = false; // Hidden in the prerendered HTML because it depends on the time.
  const todayHours = S.hours.find((h) => h.days.includes(now.day));
  if (todayHours && now.mins >= toMins(todayHours.open) && now.mins < toMins(todayHours.close)) {
    badge.textContent = `Open now · until ${todayHours.close}`;
    badge.classList.add("is-open");
  } else {
    const next = nextOpening(now);
    badge.textContent = next ? `Closed now · opens ${next}` : "Closed now";
  }

  $("#address").innerHTML = S.address.map(esc).join("<br>");
  $("#footer-addr").innerHTML = `${S.address.map(esc).join(", ")}<br><a href="tel:${esc(S.phoneIntl)}">${esc(S.phone)}</a>`;
  $("#call-btn").href = `tel:${S.phoneIntl}`;
  $("#call-btn").textContent = `Call ${S.phone}`;
  const q = encodeURIComponent(S.mapQuery);
  $("#directions-btn").href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  $("#map").src = `https://www.google.com/maps?q=${q}&output=embed`;

  // --- FAQ ----------------------------------------------------------------
  $("#faq-list").innerHTML = S.faq
    .map((f) => `<details class="faq reveal"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("");

  // --- Social -------------------------------------------------------------
  $("#social").innerHTML = Object.entries(S.social)
    .filter(([, url]) => url)
    .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="All In Fitness on ${k}">${icons[k] || ""}<span>${k[0].toUpperCase() + k.slice(1)}</span></a>`)
    .join("");
  $("#year").textContent = new Date().getFullYear();

  // --- Structured data for Google and AI tools ---------------------------
  // tools/prerender.py bakes this into index.html, so reuse that tag if it exists.
  const ld = $("#structured-data") || document.head.appendChild(document.createElement("script"));
  ld.id = "structured-data";
  ld.type = "application/ld+json";
  const gymId = `${S.siteUrl}#gym`;
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ExerciseGym",
        "@id": gymId,
        name: S.name,
        url: S.siteUrl,
        description: S.intro,
        image: `${S.siteUrl}img/hero.webp`,
        logo: `${S.siteUrl}img/logo.png`,
        telephone: S.phoneIntl,
        foundingDate: String(S.founded),
        founder: S.coaches.filter((c) => /founder/i.test(c.role)).map((c) => ({ "@type": "Person", name: c.name })),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Unit 2, Burgage House, Burgage",
          addressLocality: "Blessington",
          addressRegion: "Co. Wicklow",
          postalCode: "W91 V065",
          addressCountry: "IE",
        },
        hasMap: `https://www.google.com/maps?q=${encodeURIComponent(S.mapQuery)}`,
        openingHoursSpecification: S.hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days.map((d) => dayNames[d]),
          opens: h.open,
          closes: h.close,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Memberships",
          itemListElement: S.prices.plans.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price.replace(/[^\d.]/g, ""),
            priceCurrency: "EUR",
            description: p.features.join(". "),
            url: S.glofox.memberships,
          })),
        },
        knowsAbout: S.programmes.flatMap((p) => p.items),
        sameAs: Object.values(S.social).filter(Boolean),
      },
      {
        "@type": "FAQPage",
        "@id": `${S.siteUrl}#faq`,
        about: { "@id": gymId },
        mainEntity: S.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });

  // --- Motion: scroll reveals, count-ups, hero parallax, nav state -------
  const counted = new WeakSet();
  function countUp(el) {
    if (counted.has(el)) return;
    counted.add(el);
    const target = Number(el.dataset.count);
    const start = performance.now();
    const dur = 1400;
    (function tick(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-IE");
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
    document.querySelectorAll(".count").forEach((el) => (el.textContent = Number(el.dataset.count).toLocaleString("en-IE")));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          e.target.querySelectorAll(".count").forEach(countUp);
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  const nav = $(".nav");
  const heroBg = $(".hero-bg");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 20);
      if (!reduceMotion && y < window.innerHeight * 1.2) heroBg.style.translate = `0 ${y * 0.35}px`;
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Mobile nav ---------------------------------------------------------
  const toggle = $(".nav-toggle");
  const links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    links.classList.toggle("open", !open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("open");
    }
  });

  // --- Helpers ------------------------------------------------------------
  function toMins(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  // Current day (0 = Sunday) and minutes past midnight in Irish time,
  // whatever the visitor's own timezone.
  function dublinNow() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Dublin",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, mins: Number(get("hour")) * 60 + Number(get("minute")) };
  }

  function nextOpening(now) {
    for (let offset = 0; offset < 7; offset++) {
      const day = (now.day + offset) % 7;
      const h = S.hours.find((x) => x.days.includes(day));
      if (!h) continue;
      if (offset === 0 && now.mins >= toMins(h.open)) continue;
      const when = offset === 0 ? "today" : offset === 1 ? "tomorrow" : dayNames[day];
      return `${when} at ${h.open}`;
    }
    return null;
  }
})();
