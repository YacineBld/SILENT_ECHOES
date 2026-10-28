/* ============================================================
   SILENT ECHOES — data
   Story script, quiz, news feeds & curated fallback links.
   ============================================================ */

/* ---------- INTERACTIVE STORY (Chapter 02) ----------
   Each node: messages[] appear one by one in the fake chat,
   then choices[] are offered. `end` shows an ending card.
   cls: "other" | "me" | "cruel" | "sys"                    */

const STORY = {
  start: {
    messages: [
      { who: "MAYA", text: "guys look!! finally finished my art project 🎨", cls: "other" },
      { who: "MAYA", text: "[ selfie_with_artwork.jpg ]", cls: "other" },
      { who: "KEVIN", text: "delete this, the filter can't fix that face 💀", cls: "cruel" },
      { who: "ZOE", text: "💀💀💀", cls: "cruel" },
      { who: "SYS", text: "12 people read this. Nobody typed anything.", cls: "sys" },
    ],
    choices: [
      { text: "Send \"😂\" — it's just a joke, right?", next: "cruel" },
      { text: "Say nothing. Just keep watching.", next: "silent" },
      { text: "Type: \"not cool. delete that, Kevin.\"", next: "defend" },
    ],
  },

  cruel: {
    messages: [
      { who: "YOU", text: "😂😂", cls: "me" },
      { who: "KEVIN", text: "yo even sam is laughing 💀💀", cls: "cruel" },
      { who: "ZOE", text: "maya why are u even in this school", cls: "cruel" },
      { who: "MAYA", text: "guys please stop…", cls: "other" },
      { who: "SYS", text: "Maya left the group.", cls: "sys" },
      { who: "KEVIN", text: "drama queen lmao", cls: "cruel" },
      { who: "SYS", text: "PRIVATE MESSAGE — MAYA:", cls: "sys" },
      { who: "MAYA", text: "I thought you were my friend.", cls: "other" },
    ],
    choices: [
      { text: "DM back: \"You're right. I'm sorry. I'll fix this tomorrow — publicly.\"", next: "apology" },
      { text: "Leave her on read. It's embarrassing.", next: "ghost" },
    ],
  },

  silent: {
    messages: [
      { who: "ZOE", text: "she was actually crying in the hallway today lol", cls: "cruel" },
      { who: "KEVIN", text: "screenshotting this thread before she deletes 💀", cls: "cruel" },
      { who: "SYS", text: "Maya left the group.", cls: "sys" },
      { who: "SYS", text: "The next day, Maya doesn't come to school.", cls: "sys" },
      { who: "SYS", text: "PRIVATE MESSAGE — MAYA:", cls: "sys" },
      { who: "MAYA", text: "everyone saw it. nobody said anything. not even you.", cls: "other" },
    ],
    choices: [
      { text: "Reply now: \"I saw it and froze. No excuse. I'm telling a teacher tomorrow.\"", next: "late" },
      { text: "Still say nothing.", next: "ghost" },
    ],
  },

  defend: {
    messages: [
      { who: "YOU", text: "not cool. delete that, Kevin.", cls: "me" },
      { who: "SYS", text: "The chat goes quiet for a full minute.", cls: "sys" },
      { who: "ZOE", text: "…ok that was mean actually. sorry maya", cls: "other" },
      { who: "KEVIN", text: "omg it was a JOKE chill", cls: "cruel" },
      { who: "SYS", text: "Kevin deleted a message.", cls: "sys" },
      { who: "MAYA", text: "thank you sam ❤️", cls: "other" },
      { who: "SYS", text: "PRIVATE MESSAGE — MAYA:", cls: "sys" },
      { who: "MAYA", text: "i was about to delete my whole account. you have no idea what that meant.", cls: "other" },
    ],
    end: {
      title: "ENDING 1/3 — THE ECHO THAT ANSWERED",
      text: "One voice in the chat changed the whole room. Studies show that when a peer intervenes, bullying stops within seconds in more than half of cases. Online, courage is a message long. Be the echo that answers.",
      sig: 15,
    },
  },

  apology: {
    messages: [
      { who: "YOU", text: "You're right. I went along like an idiot. I'll say it in the group tomorrow — and I'm telling a teacher.", cls: "me" },
      { who: "MAYA", text: "…ok. that actually means something.", cls: "other" },
    ],
    end: {
      title: "ENDING 2/3 — THE REPAIRED ECHO",
      text: "You laughed first — then you owned it. Repairing an echo costs more than preventing one, but repair is still possible. The internet never forgets; it can, however, learn.",
      sig: 8,
    },
  },

  late: {
    messages: [
      { who: "YOU", text: "I saw it and froze. That's not an excuse. I'm telling Ms. Rivera tomorrow.", cls: "me" },
      { who: "MAYA", text: "I wish you'd said it in the chat. But… thank you for saying it now.", cls: "other" },
    ],
    end: {
      title: "ENDING 2/3 — TOO LATE IS STILL A CHOICE",
      text: "Speaking late beats never speaking — but wounds remember silence. The bystander is never neutral: doing nothing is still doing something.",
      sig: 5,
    },
  },

  ghost: {
    messages: [
      { who: "SYS", text: "Maya blocked you.", cls: "sys" },
      { who: "SYS", text: "Months later, Maya still sits alone at lunch. The chat moved on. She didn't.", cls: "sys" },
    ],
    end: {
      title: "ENDING 3/3 — THE FADE",
      text: "Nearly half of teens face online harassment. Most adults never hear about it. Every unread reply, every seen-and-ignored message, is a choice — and the sum of those choices decides whether someone fades.",
      sig: -15,
    },
  },
};

/* ---------- QUIZ (Chapter 05) ---------- */

const QUIZ = {
  title: "DIAGNOSTIC",
  questions: [
    {
      q: "You wake up. Your phone is…",
      opts: [
        { t: "Already in my hand — I checked before my eyes fully opened", s: 0 },
        { t: "Checked within 10 minutes", s: 1 },
        { t: "Checked after breakfast", s: 2 },
        { t: "Somewhere… I'll find it later", s: 3 },
      ],
    },
    {
      q: "A friend is being mocked in a group chat. You…",
      opts: [
        { t: "Add a laughing emoji — it's funny, sorry", s: 0 },
        { t: "Watch silently and hope it stops", s: 1 },
        { t: "DM the friend to check on them", s: 2 },
        { t: "Call it out publicly, right there", s: 3 },
      ],
    },
    {
      q: "Your screen time yesterday was…",
      opts: [
        { t: "10+ hours (I don't want to talk about it)", s: 0 },
        { t: "7–9 hours", s: 1 },
        { t: "4–6 hours", s: 2 },
        { t: "Under 3 hours", s: 3 },
      ],
    },
    {
      q: "A shocking story appears on your feed. Before sharing, you…",
      opts: [
        { t: "Share it — if it's shocking, people need to know", s: 0 },
        { t: "Read the comments to see if it's true", s: 1 },
        { t: "Check the source and date", s: 2 },
        { t: "Verify it across multiple independent sources", s: 3 },
      ],
    },
    {
      q: "When you ask an AI a question, do you think about what it costs?",
      opts: [
        { t: "Cost? It's free", s: 0 },
        { t: "Vaguely — electricity, probably?", s: 1 },
        { t: "Yes — water, energy, data centres", s: 2 },
        { t: "Yes — and I weigh whether AI is worth it each time", s: 3 },
      ],
    },
  ],
  results: [
    { min: 0, name: "DIGITAL GHOST", text: "The feed owns your attention and your silence does its work in group chats. You're more machine than mirror right now — but noticing that is the first reboot." },
    { min: 5, name: "TERMINAL RESIDENT", text: "You live comfortably inside the screen and visit the real world occasionally. The echo is loud where you are — start asking who profits from it." },
    { min: 9, name: "HYBRID BEING", text: "Half online, half awake. You sense the system but still play along with it. You're close — the next step is deliberate, not default." },
    { min: 13, name: "AWAKE HUMAN", text: "You use technology; it doesn't use you. Rare specimen. Now the mission is bigger: help the ghosts around you wake up too." },
  ],
};

/* ---------- DATA TRAIL (Intro) ---------- */

const TRAIL_STEPS = [
  { time: "07:02", act: "You check your phone before your eyes are fully open.",
    chips: ["wake time: 07:02", "sleep: 6h12 — poor"] },
  { time: "08:15", act: "You scroll through the feed on the bus.",
    chips: ["location: route to school", "interest: sneakers", "mood: tired"] },
  { time: "12:30", act: "You post a photo of your lunch.",
    chips: ["faces recognised: +2 friends", "location: cafeteria", "food profile: fast food"] },
  { time: "15:40", act: "You search \"why can't I focus anymore\".",
    chips: ["health flag: attention", "profile: stressed student"] },
  { time: "18:20", act: "You watch 40 short videos in a row.",
    chips: ["watch time today: +3h", "hooks: gaming, memes, drama"] },
  { time: "23:57", act: "You doomscroll in the dark instead of sleeping.",
    chips: ["active hours: night owl", "anxiety signal: likely"] },
];

const TRAIL_VERDICT =
  "PROFILE COMPLETE: night-owl student, stressed, into sneakers & gaming — worth a few cents per ad impression, thousands of times a day. This is what \"free\" costs.";

/* ---------- MIRROR / ECHO COMPANION (Chapter 01) ---------- */

const ECHO_ACTIONS = {
  scroll:  { score: -12, co2: 20, text: "doomscrolled for 1h" },
  stream:  { score: -8,  co2: 40, text: "streamed video for 1h" },
  ai:      { score: -5,  co2: 8,  text: "ran an AI chat session" },
  outside: { score: +18, co2: 0,  text: "spent 1h outside, offline" },
};

const ECHO_STATES = [
  { min: 75, cls: "s-good", mood: "MOOD: THRIVING" },
  { min: 45, cls: "s-mid",  mood: "MOOD: OK" },
  { min: 20, cls: "s-low",  mood: "MOOD: DRAINED" },
  { min: 0,  cls: "s-bot",  mood: "MOOD: FULL MACHINE" },
];

const ECHO_LOGS = {
  down: [
    "dopamine hit +1",
    "attention sold to highest bidder",
    "sponsored content injected",
    "memory of 'outside': corrupted",
    "sleep deficit: -47 min",
    "comparing yourself to 14 strangers",
    "friend request (real life): declined",
    "autoplay engaged — choice removed",
    "algorithm confidence: 97.3%",
    "ECHO rust level: rising",
  ],
  up: [
    "real conversation restored",
    "grass texture loading… done",
    "eyes recalibrating to daylight",
    "friendship.exe repaired",
    "sunlight detected — vitamin D +1",
    "boredom detected → imagination booting",
    "a tree takes root in the grove",
  ],
};

const FOCUS_POPUPS = [
  "👍 12 people liked your post",
  "🔥 your streak dies in 3h",
  "📸 zoe tagged you in a photo",
  "👀 kevin is typing…",
  "⚡ FLASH SALE — 50% off, 2h left",
  "🎁 claim your daily reward",
  "🚨 breaking news: nothing important",
  "🤖 bot_4521 started following you",
];

/* ---------- REPORT OR SCROLL (Chapter 02) ---------- */

const REPORT_CARDS = [
  { msg: "\"omg nobody likes u, why do u even come to school lol\"", bad: true,
    why: "Direct personal attack meant to humiliate — textbook cyberbullying. Report it." },
  { msg: "\"your team played terrible yesterday ngl\"", bad: false,
    why: "An opinion about a game, not a person. Annoying ≠ harassment — scrolling past is fine." },
  { msg: "\"everyone vote: who looks worse in the pic — maya or lily 😂\"", bad: true,
    why: "A poll turned into a public humiliation tool. This is organised cruelty — report it." },
  { msg: "\"can't believe u actually said that in class 💀\"", bad: false,
    why: "Teasing between friends can be fine — context matters. Watch for repetition and how the target reacts." },
  { msg: "DM — \"send me that photo of her or you're next\"", bad: true,
    why: "Blackmail and threats. Report it AND tell an adult — this is beyond 'drama'." },
];

/* ---------- THE 20-SECOND DECISION (Chapter 03) ---------- */

const DECISION_FILE = {
  ref: "TARGET FILE #37,241",
  fields: [
    ["AI confidence score", "87%"],
    ["Phone shared with", "2 contacts of interest"],
    ["Movement pattern", "irregular — flagged"],
    ["Registered home", "apt. 4B — 6 residents incl. 3 children"],
    ["System error rate", "±10%"],
    ["Data last updated", "11 days ago"],
  ],
  seconds: 20,
  reveal:
    "This is the actual workflow described by six intelligence officers to +972 Magazine: ~20 seconds of human review per name, treated \"as if it were a human decision\" — with a known ~10% error rate. Whatever you chose, the machine had already chosen.",
};

/* ---------- SPOT THE BOT (Chapter 03) ---------- */

const BOT_ROUNDS = [
  { human: "just failed my maths test again lmaoo my mum's gonna kill me 😭",
    bot: "Today presented an academic challenge. My performance in the mathematics assessment fell below expectations, prompting reflection on my study methodology.",
    why: "AI over-formalises: zero typos, detached vocabulary — nobody talks like this in a group chat." },
  { human: "rain again. third day in a row. my shoes are still wet from monday",
    bot: "Persistent precipitation has characterised the past 72 hours, creating an atmosphere many would describe as melancholic and contemplative.",
    why: "AI pads a tiny observation with filler — humans keep it blunt and concrete." },
  { human: "nooo way, they actually did it?? watching the highlights rn",
    bot: "I must admit, this outcome was unexpected. I am currently reviewing the recorded highlights of the event in question.",
    why: "AI narrates instead of reacting — no 'nooo way', no 'rn', no actual excitement." },
  { human: "bro the new update broke everything, can't even login anymore 💀",
    bot: "Following the recent software update, users are experiencing significant difficulties, including the inability to access their accounts.",
    why: "Same complaint, but the AI version reads like a press release. 'bro' and '💀' are the human fingerprint." },
];

/* ---------- WATCH — video gallery ---------- */

const VIDEOS = {
  feed: [
    { id: "uaaC57tcci0", t: "The Social Dilemma — trailer", s: "Netflix (2020)" },
    { id: "dRl8EIhrQjQ", t: "Can We Auto-Correct Humanity?", s: "Prince Ea (2014)" },
    { id: "0K5OO2ybueM", t: "Why our screens make us less happy", s: "TED — Adam Alter (2017)" },
  ],
  echoes: [
    { id: "MV5v0m6pEMs", t: "Create No Hate", s: "Luke Culhane (2016)" },
    { id: "asTti6y39xI", t: "Cyber Bullying", s: "UNICEF" },
  ],
  conflicts: [
    { id: "4RmNJH4UN3s", t: "Lavender & Where's Daddy", s: "Democracy Now! (2024)" },
    { id: "xGqYbXL3kZc", t: "How AI tells Israel who to bomb", s: "Explainer (2024)" },
  ],
  planet: [
    { id: "cl1ctf1_JxE", t: "Data centres' water problem", s: "DW — Transforming Business" },
    { id: "RT8-GlA_rkM", t: "AI's hidden climate costs", s: "CBC — About That" },
  ],
};

/* ---------- LIVE FEED (RSS) ---------- */

/* Real RSS feeds per theme (The Guardian + BBC), fetched
   through the rss2json public API (CORS-friendly, no key
   needed for light use). If it fails or is unreachable,
   the curated FALLBACK_NEWS links are displayed instead. */

const NEWS_FEEDS = {
  mental: {
    label: "Health & mind",
    rss: [
      "https://feeds.bbci.co.uk/news/health/rss.xml",
    ],
  },
  cyber: {
    label: "Social media",
    rss: [
      "https://www.theguardian.com/technology/rss",
      "https://feeds.bbci.co.uk/news/technology/rss.xml",
    ],
  },
  conflict: {
    label: "Conflict",
    rss: [
      "https://www.theguardian.com/world/israel/rss",
      "https://feeds.bbci.co.uk/news/world/rss.xml",
    ],
  },
  planet: {
    label: "AI & planet",
    rss: [
      "https://www.theguardian.com/technology/artificialintelligenceai/rss",
      "https://www.theguardian.com/environment/rss",
    ],
  },
};

const RSS_API = "https://api.rss2json.com/v1/api.json?rss_url=";

const FALLBACK_NEWS = [
  {
    cat: "conflict", source: "+972 Magazine",
    title: "'Lavender': The AI machine directing Israel's bombing spree in Gaza",
    url: "https://www.972mag.com/lavender-ai-israeli-army-gaza/",
  },
  {
    cat: "conflict", source: "NAZA Documentary",
    title: "NAZA — the officers behind the AI targeting machine, on camera",
    url: "https://naza-documentary.com",
  },
  {
    cat: "conflict", source: "CNN",
    title: "Israel is using artificial intelligence to help pick bombing targets in Gaza, report says",
    url: "https://www.cnn.com/2024/04/03/middleeast/israel-gaza-artificial-intelligence-bombing-intl",
  },
  {
    cat: "planet", source: "UC Riverside / arXiv",
    title: "Making AI Less 'Thirsty': Uncovering the secret water footprint of AI models",
    url: "https://arxiv.org/abs/2304.03271",
  },
  {
    cat: "planet", source: "DW — Transforming Business",
    title: "Why data centers are eating up enormous water resources",
    url: "https://www.youtube.com/watch?v=cl1ctf1_JxE",
  },
  {
    cat: "mental", source: "Netflix",
    title: "The Social Dilemma — what social media is doing to our brains",
    url: "https://www.netflix.com/title/81254224",
  },
  {
    cat: "mental", source: "American Psychological Association",
    title: "Health advisory on social media use in adolescence",
    url: "https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use",
  },
  {
    cat: "mental", source: "DataReportal",
    title: "Digital 2024: Global Overview Report — how much time we spend online",
    url: "https://datareportal.com/reports/digital-2024-global-overview-report",
  },
  {
    cat: "cyber", source: "Pew Research Center",
    title: "Teens and Cyberbullying 2022 — nearly half of US teens affected",
    url: "https://www.pewresearch.org/internet/2022/12/15/teens-and-cyberbullying-2022/",
  },
  {
    cat: "cyber", source: "UNICEF",
    title: "Online safety: cyberbullying, awareness and empowerment",
    url: "https://www.unicef.org/southafrica/online-safety",
  },
];
