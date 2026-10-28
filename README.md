# SILENT ECHOES — Digital Humanity

> *We live through screens. What does that do to us?*

**Silent Echoes** is an interactive, single-page web documentary about the hidden human cost of our digital lives. It follows the "echoes" our clicks leave behind — in our brains, in our classrooms, in war zones, and in the rivers that cool the machines.

The project is not anti-technology. Its question is not *whether* we use technology, but whether **we** use it — or it uses us.

🔗 **Live site:** https://yacinebld.github.io/SILENT_ECHOES/

---

## The journey

The site is structured as a descent through five chapters, framed by an introduction and a live news section.

| Section | Theme | What you'll find |
|---|---|---|
| **The Signal** (intro) | Our life through screens | Animated key statistics (screen time, internet users, cyberbullying, data-centre water use) and *"A day, as the algorithm sees it"* — click through an ordinary day and watch an advertising profile being built about you. |
| **01 — The Attention Economy** | How platforms capture our attention | *Echo*, a "mirror companion" that reflects your habits back at you, a **Focus Test** against a stream of distractions, and *The Social Dilemma* trailer. |
| **02 — Silent Echoes** | Cyberbullying and the bystander effect | An **interactive group-chat story**: Maya shares her artwork, the chat turns cruel — and you choose what to do. Each choice leads to a different ending. Followed by *Report or Scroll?* and the short film *Create No Hate*. |
| **03 — Silent Intelligence** | AI in modern warfare | *The 20-Second Decision* — a role-play on algorithmic targeting inspired by the +972 *Lavender* investigation — and *Spot the Bot*, on AI-generated content. |
| **04 — The Hidden Cost** | The environmental footprint of the digital world | *The Thirst Calculator*, estimating the water behind your online habits, and a DW report on data centres. |
| **05 — Reconnect** | Solutions | Six practical habits, a five-question **diagnostic quiz**, and **The Digital Pledge** — pick your commitments, sign, and screenshot your card. |
| **Watch** | The evidence | A video library of short films, documentaries and talks, sorted by theme. |
| **This is happening — Now** | Live feed | Real headlines pulled live from BBC and The Guardian RSS feeds, filtered by topic, with curated fallback links. |
| **Sources & Credits** | — | Every statistic and video is referenced. |

The hero section features the original short film **"Silent Echoes — Digital Humanity"** (`Silent_Echoes-Digital Humanity .mp4`).

## Features

- 🎬 Original short film in the hero section, plus lazy-loaded YouTube embeds (thumbnail first, player on click)
- 💬 Branching interactive story with multiple endings
- 🧠 Mini-games, quiz, calculator and a printable digital pledge
- 📰 Live news feed via RSS (through the rss2json API)
- 🌗 Light / dark theme toggle
- ✨ Particle background, glitch titles, typewriter text, scroll-reveal animations and a boot sequence
- ♿ Skip link, semantic sections and ARIA labels
- 📱 Responsive layout for phones, tablets and desktops

## Tech stack

Pure front-end — **no framework, no build step, no dependencies**.

- **HTML5** — `index.html`
- **CSS3** — `css/style.css` (custom properties, animations, responsive grid)
- **Vanilla JavaScript** — `js/main.js` (all interactions) and `js/data.js` (story script, quiz questions, video list, RSS feeds)
- **Fonts:** Space Grotesk & JetBrains Mono (Google Fonts)

## Project structure

```
SILENT_ECHOES/
├── index.html                          # The whole page
├── css/
│   └── style.css                       # Styles, themes and animations
├── js/
│   ├── data.js                         # Content: story, quiz, videos, feeds
│   └── main.js                         # Interactivity and widgets
└── Silent_Echoes-Digital Humanity .mp4 # Original short film
```

## Run it locally

Just open `index.html` in a browser. For the live news feed and video embeds to behave best, serve it through a small local server:

```bash
npx serve .
```

(or `python -m http.server 8000`, then visit http://localhost:8000).

## Credits

Created as an English-class project on the theme of **digital humanity**.
Third-party videos (Netflix, Luke Culhane, Democracy Now!, DW…) and news headlines belong to their respective owners and are embedded or linked for educational purposes. Full references are listed in the *Sources & Credits* section of the site.
