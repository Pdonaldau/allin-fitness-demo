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

  // Glofox booking page. Replace with the gym's own Glofox link.
  bookingUrl: "#",

  social: {
    facebook: "https://www.facebook.com/allinfitnessblessington/",
    instagram: "", // Instagram handle not confirmed — add full URL here
  },

  // News shown in the scrolling red band. Each item disappears by itself after
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

  // Each class is dealt as a playing card. Suit: spade, heart, diamond or club.
  classes: [
    { name: "BETA", suit: "spade", level: "Advanced", text: "Our signature high-intensity session. Short, sharp and built to test you." },
    { name: "Strength", suit: "heart", level: "All levels", text: "Coached blocks every Tuesday & Thursday. Learn the lifts properly and get stronger week on week." },
    { name: "HIIT", suit: "diamond", level: "All levels", text: "Intervals that push the heart rate up and keep it there. Scaled to suit everyone in the room." },
    { name: "Conditioning", suit: "club", level: "All levels", text: "Engine-building circuits for fitness that carries over to sport and everyday life." },
    { name: "Boxing", suit: "spade", level: "All levels", text: "Back on Tuesday evenings. Pads, bags and footwork — a full-body workout that's as much fun as it is tough." },
    { name: "Yoga", suit: "heart", level: "Beginner friendly", text: "Thursday mornings. Mobility, flexibility and a chance to slow down — the perfect partner to hard training." },
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
      { time: "09:30", classes: ["", "", "Conditioning", "Yoga", "", "BETA", "Conditioning"] },
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
  prices: {
    placeholder: true,
    note: "Student, family and off-peak rates available — ask at the desk.",
    plans: [
      { name: "Gym Only", price: "€XX", period: "/month", features: ["Full gym access", "All opening hours", "Free parking"] },
      { name: "Go All In", price: "€XX", period: "/month", featured: true, features: ["Full gym access", "Unlimited classes", "Book through the Glofox app"] },
      { name: "Class Pack", price: "€XX", period: "/6 classes", features: ["6 classes per month", "Any class on the timetable", "Great for getting started"] },
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

  // From a 2020 news article — confirm names and roles with the gym.
  coaches: [
    { name: "Eamonn Blake", role: "Co-founder" },
    { name: "Jordan Lynch", role: "Co-founder" },
    { name: "Kevin Cooney", role: "Coach & Director" },
    { name: "Amy Burke", role: "Coach" },
  ],

  community: [
    { title: "Blessington GAA partner", text: "Strength and conditioning for local GAA and soccer teams." },
    { title: "Running club", text: "Group runs around Blessington and the lakes." },
    { title: "Personal training", text: "One-to-one sessions and online programmes built around your goals." },
  ],
};
