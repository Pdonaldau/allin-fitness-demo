// All site content lives here. Edit this file to change hours, prices, classes,
// equipment, coaches, news or links — no other file needs to change.
//
// Anything marked `placeholder: true` (or listed under `demo`) is invented for the
// demo and must be replaced with the gym's real details before going live.

window.SITE = {
  // Set to false once real prices, timetable and photos are in.
  demo: true,

  name: "All In Fitness",
  tagline: "Blessington's biggest gym",
  intro:
    "3,750 sq ft of serious kit, classes every day and coaches who know your name. Whatever your level, you're welcome here.",
  founded: 2019,

  phone: "045 900 372",
  phoneIntl: "+35345900372",
  address: ["Unit 2, Burgage House", "Burgage, Blessington", "Co. Wicklow", "W91 V065"],
  mapQuery: "All In Fitness, Unit 2, Burgage House, Blessington, Co. Wicklow, W91 V065",

  // The gym's Glofox portal (from their Instagram link in bio). "Book a class" buttons
  // open the class timetable; "Join now" buttons open memberships, where people
  // register and buy. Glofox handles signup and forms, not this site.
  glofox: {
    classes: "https://app.glofox.com/portal/#/branch/5d1b81034602ae00a6331853/classes-day-view?header=classes,courses,memberships,trainers,facilities",
    memberships: "https://app.glofox.com/portal/#/branch/5d1b81034602ae00a6331853/memberships?header=classes,courses,memberships,trainers,facilities",
  },

  social: {
    facebook: "https://www.facebook.com/allinfitnessblessington/",
    instagram: "", // Instagram handle not confirmed — add full URL here
  },

  // News shown in the scrolling blue band. Each item disappears by itself after
  // its `until` date (YYYY-MM-DD). Leave the list empty to show class names only.
  news: [
    { text: "Free trial weekend · Sat 3 & Sun 4 October · Over 18s", until: "2026-10-04" },
    { text: "Boxing is back on Tuesday evenings", until: "2026-10-31" },
    { text: "Strength class blocks every Tuesday & Thursday", until: "2026-12-31" },
  ],

  // Times are 24-hour, Irish time. Days 0 = Sunday ... 6 = Saturday.
  hours: [
    { label: "Monday – Friday", days: [1, 2, 3, 4, 5], open: "06:00", close: "21:00" },
    { label: "Saturday", days: [6], open: "08:00", close: "15:00" },
    { label: "Sunday", days: [0], open: "08:00", close: "13:00" },
  ],

  // `count` animates up from zero when the number scrolls into view.
  stats: [
    { count: 3750, unit: "sq ft", label: "Largest gym in west Wicklow" },
    { count: 7, unit: "years", label: "Serving Blessington since 2019" },
    { value: "6am", label: "Open early on weekdays" },
    { value: "Free", label: "Parking on site" },
  ],

  // Two playing cards: Training first, because the gym wants to be known as a training
  // gym. Class names come from their Glofox (checked 2026-10-13); the line-up changes, so
  // the card tells people to check. Suit: spade, heart, diamond or club. `link` picks the
  // Glofox page the button opens (classes or memberships).
  programmes: [
    {
      name: "Training", suit: "spade", tag: "Coached",
      text: "Proper coaching built around you, from your first lift to match day.",
      items: ["Small group training", "One-to-one personal training", "Strength & conditioning for teams", "Online programmes"],
      button: "Book training", link: "classes",
    },
    {
      name: "Classes", suit: "heart", tag: "All levels",
      text: "Group classes most days. The line-up changes through the year, so check the app or ask at the desk.",
      items: ["All In Strength", "All In Conditioning", "All In Hybrid", "HYROX", "Men's Boxing", "Ladies' Boxing"],
      button: "See this week's classes", link: "classes",
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

  // PLACEHOLDER timetable — replace with the real Glofox schedule.
  timetable: {
    placeholder: true,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    slots: [
      { time: "06:30", classes: ["HIIT", "Strength", "BETA", "Strength", "HIIT", "", ""] },
      { time: "09:30", classes: ["", "", "Conditioning", "", "", "BETA", "Conditioning"] },
      { time: "11:00", classes: ["", "", "", "", "", "HIIT", ""] },
      { time: "18:30", classes: ["BETA", "Boxing", "Strength", "BETA", "", "", ""] },
      { time: "19:30", classes: ["Conditioning", "HIIT", "", "Strength", "", "", ""] },
    ],
  },

  // Seen in the gym's photos; confirm brands and counts with the gym.
  equipment: {
    placeholder: true,
    photo: "img/cardio.webp",
    groups: [
      { name: "Plate-loaded", items: ["Chest & shoulder press", "Rows & pulldowns", "Leg press & hack squat", "Hip thrust"] },
      { name: "Free weights", items: ["Full dumbbell racks", "Olympic barbells", "Bumper plates", "Adjustable benches"] },
      { name: "Cardio deck", items: ["Evolve treadmills", "StairMaster", "Bikes", "Rowers"] },
      { name: "Boxing wall", items: ["Heavy bags", "Uppercut bags", "Pads & gloves"] },
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

  // Founders only, at the gym's request. Names from a 2020 news article — confirm spelling.
  coaches: [
    { name: "Eamonn Blake", role: "Co-founder" },
    { name: "Jordan Lynch", role: "Co-founder" },
  ],

  community: [
    { title: "Blessington GAA partner", text: "Strength and conditioning for local GAA and soccer teams." },
    { title: "Running club", text: "Group runs around Blessington and the lakes." },
    { title: "Personal training", text: "One-to-one sessions and online programmes built around your goals." },
  ],
};
