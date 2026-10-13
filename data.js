// All site content lives here. Edit this file to change hours, prices, classes,
// equipment, coaches, news or links — no other file needs to change.
//
// Anything marked `placeholder: true` is not yet confirmed by the gym. Check it before
// going live. The site no longer shows placeholder notes.

window.SITE = {
  name: "All In Fitness",
  // Tagline and intro are the gym's own wording (2026-10-13).
  tagline: "Blessington's best equipped gym",
  intro:
    "Machines from industry-leading brands including Gymleco, Life Fitness, Cybex, Atlantis, Primal, Concept2 & Evolve. From brand new to vintage & restored, we have some very nice pieces that you don't see in the average gym.",
  founded: 2019,

  // The site's public address. Used in structured data and llms.txt. Change it to the
  // gym's .ie domain at go-live, then run `py -3 tools/prerender.py`.
  siteUrl: "https://pdonaldau.github.io/allin-fitness-demo/",

  phone: "045 900 372",
  phoneIntl: "+35345900372",
  address: ["Unit 2, Burgage House", "Burgage, Blessington", "Co. Wicklow", "W91 V065"],
  mapQuery: "All In Fitness, Unit 2, Burgage House, Blessington, Co. Wicklow, W91 V065",

  // The gym's Glofox portal (from their Instagram link in bio). "Book a class" buttons
  // open Glofox classes; "Join now" buttons open memberships, where people register
  // and buy. Glofox handles signup and forms, not this site. The site never lists
  // class times: the gym wants times given on enquiry.
  glofox: {
    classes: "https://app.glofox.com/portal/#/branch/5d1b81034602ae00a6331853/classes-day-view?header=classes,courses,memberships,trainers,facilities",
    memberships: "https://app.glofox.com/portal/#/branch/5d1b81034602ae00a6331853/memberships?header=classes,courses,memberships,trainers,facilities",
  },

  social: {
    facebook: "https://www.facebook.com/allinfitnessblessington/",
    instagram: "https://www.instagram.com/aif_blessington/",
  },

  // News shown in the scrolling blue band. Each item disappears by itself after
  // its `until` date (YYYY-MM-DD). Leave the list empty to show class names only.
  news: [
    { text: "Free trial weekend · Sat 3 & Sun 4 October · Over 18s", until: "2026-10-04" },
  ],

  // Times are 24-hour, Irish time. Days 0 = Sunday ... 6 = Saturday.
  hours: [
    { label: "Monday – Friday", days: [1, 2, 3, 4, 5], open: "06:00", close: "21:00" },
    { label: "Saturday", days: [6], open: "08:00", close: "15:00" },
    { label: "Sunday", days: [0], open: "08:00", close: "13:00" },
  ],

  // `count` animates up from zero when the number scrolls into view.
  stats: [
    { count: 5000, unit: "sq ft", label: "Of training space" },
    { count: 7, unit: "years", label: "Serving Blessington since 2019" },
    { value: "6am", label: "Open early on weekdays" },
    { value: "Free", label: "Parking on site" },
  ],

  // One-to-one personal training is run by the individual trainers, not the gym, so the
  // Training button goes to the contact section, never to a booking page.
  // Two playing cards: Training first, because the gym wants to be known as a training
  // gym. Class names come from their Glofox (checked 2026-10-13); the line-up changes, so
  // the card tells people to ask. Never list class days or times (gym request). Suit:
  // spade, heart, diamond or club. `link` picks where the button goes: classes or
  // memberships (Glofox), or visit (the contact section on this page).
  programmes: [
    {
      name: "Training", suit: "spade", tag: "Coached",
      text: "Proper coaching built around you, from your first lift to match day.",
      items: ["Small group training", "One-to-one personal training with our trainers", "Strength & conditioning for teams", "Online programmes"],
      button: "Other services available", link: "visit",
    },
    {
      name: "Classes", suit: "heart", tag: "All levels",
      text: "Something for everyone, whatever your level. Book online, or call us or ask at the desk for what's on.",
      items: ["All In Strength", "All In Conditioning", "All In Hybrid", "HYROX", "Men's Boxing", "Ladies' Boxing"],
      button: "Book a class", link: "classes",
    },
  ],

  // Photos from the gym's Facebook page. `size`: big, tall or small (grid layout).
  gallery: [
    { src: "img/hero.webp", alt: "Members training on a busy gym floor", size: "big" },
    { src: "img/floor-machines.webp", alt: "Plate-loaded machines and benches", size: "tall" },
    { src: "img/cardio.webp", alt: "Evolve treadmills and a StairMaster on the upper floor", size: "tall" },
    { src: "img/boxing.webp", alt: "Heavy bags on the boxing wall", size: "small" },
    { src: "img/floor-wide.webp", alt: "Wide view of the free weights area", size: "small" },
    { src: "img/floor-strength.webp", alt: "Strength machines and benches", size: "small" },
  ],

  // Brands by machine type, from the gym (2026-10-13).
  equipment: {
    placeholder: false,
    photo: "img/cardio.webp",
    groups: [
      { name: "Plate-loaded upper body", items: ["Gymleco", "Cybex", "Primal"] },
      { name: "Plate-loaded lower body", items: ["Atlantis", "Gymleco", "Primal", "Strength Max"] },
      { name: "Cable & belt driven", items: ["Primal", "Life Fitness", "Gymleco"] },
      { name: "Cardio", items: ["Evolve", "StairMaster", "Life Fitness", "Technogym", "Concept2", "Gym Gear"] },
    ],
  },

  // PLACEHOLDER prices — replace with the gym's real price list.
  // From the gym's Glofox memberships page, checked 2026-10-13. Every plan includes
  // full gym access and all classes.
  prices: {
    placeholder: false,
    note: "Student and OAP rates: €169 for 3 months or €425 for a year. Buy any membership through Glofox.",
    plans: [
      { name: "Monthly", price: "€59", period: "/month", features: ["Full gym and all classes", "€20 joining fee", "3-month minimum, 2 weeks' notice to cancel"] },
      { name: "Annual", price: "€525", period: "/year", featured: true, features: ["Full gym and all classes", "One payment, no direct debits", "Works out under €44 a month"] },
      { name: "3 Months", price: "€195", period: "/3 months", features: ["Full gym and all classes", "One payment, no direct debits", "Nothing to cancel"] },
    ],
  },

  story: {
    photo: "img/founders.webp",
    photoAlt: "The All In Fitness team celebrating the gym's 7th birthday",
    title: "Seven years all in",
    text: [
      "All In Fitness opened in Blessington in September 2019 in a single 2,250 sq ft unit. By Christmas we'd knocked through to next door — and we've kept growing since.",
      "We're a member-focused gym. We train local GAA and soccer teams, run classes every day, and know the people who walk through the door.",
    ],
  },

  // Names and roles from the gym (2026-10-13). Founders first.
  coaches: [
    { name: "Eamonn Blake", role: "Co-founder" },
    { name: "Jordan Lynch", role: "Co-founder" },
    { name: "Dan Courtney", role: "Full-time coach" },
    { name: "Robyn Nolan", role: "Part-time coach" },
    { name: "Aidan King", role: "Part-time coach" },
    { name: "Shane O'Connor", role: "Reception & admin" },
  ],

  // Questions and answers. Shown on the page and given to Google and AI tools as an
  // FAQ. Keep prices and class names here in step with `prices` and `programmes`.
  // Never put class days or times here (gym request).
  faq: [
    {
      q: "Where is All In Fitness?",
      a: "Unit 2, Burgage House, Burgage, Blessington, Co. Wicklow, W91 V065. Parking on site is free. Call us on 045 900 372.",
    },
    {
      q: "How much is a gym membership?",
      a: "€59 a month (plus a €20 joining fee, with a 3-month minimum), €195 for 3 months, or €525 for a year. Student and OAP memberships are €169 for 3 months or €425 for a year. Every membership includes the full gym and all classes.",
    },
    {
      q: "Do you offer personal training?",
      a: "Yes. One-to-one personal training is run by the trainers who work at the gym, so call us or ask at the desk and we'll put you in touch. The gym also runs small group training sessions.",
    },
    {
      q: "What classes do you run?",
      a: "All In Strength, All In Conditioning, All In Hybrid, HYROX, Men's Boxing and Ladies' Boxing. Class times change through the year, so call us or ask at the desk for what's on.",
    },
    {
      q: "Do you train sports teams?",
      a: "Yes. We run strength and conditioning for local GAA and soccer teams.",
    },
    {
      q: "How do I join?",
      a: "Buy a membership online through Glofox, or call in to the gym. You register on Glofox, which is also where you fill in the gym's forms and book.",
    },
  ],

  community: [
    { title: "Proud Blessington GAA Club sponsor", text: "We back our local GAA club and run strength and conditioning for local teams." },
    { title: "Proud Blessington AFC sponsor", text: "We back our local soccer club, on and off the pitch." },
    { title: "Personal training", text: "Our trainers offer one-to-one sessions and online programmes. Ask at the desk to be put in touch." },
  ],
};
