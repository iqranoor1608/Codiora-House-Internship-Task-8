<div align="center">

# 🧭 Meridian — Travel & Tourism Experience Platform

### *Travel, mapped for who you are.*

Meridian is a travel discovery platform built with plain **HTML, CSS &amp; JavaScript** over an 8-week internship and finalized in **Week 8 — Final Professional Project**. It combines destination discovery, trip planning, service booking, reviews, and a smart recommendation assistant into one polished, responsive, light/dark-mode-aware product.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Build Step](https://img.shields.io/badge/Build%20Step-None-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge)

</div>

<br>

## 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Task 8 — What Changed in This Final Version](#-task-8--what-changed-in-this-final-version)
- [Known Limitations](#️-known-limitations)
- [Future Improvements](#-future-improvements)
- [Internship Context](#-internship-context)
- [Author](#-author)

<br>

## 📖 About

Travel sites usually make people re-filter the same preferences every visit. Meridian remembers saved destinations, recently viewed places, and trip plans locally (via `localStorage`), and uses that history to recommend places worth looking at next — no account or backend required to try it.

<br>

## ✨ Features

| | |
|---|---|
| 🏠 **Home page** | Hero/banner, quick search & booking bar, featured-destination carousel, popular destinations, call-to-action section |
| 🌍 **Destinations / Explore** | Search, trail filtering, and sort by rating or price |
| 📍 **Destination detail pages** | Photo gallery, description, highlights, price, rating, and suggested trip duration |
| 🧳 **Trip planner** | Build a multi-day itinerary with activities per day |
| 🛎 **Travel services & booking** | Hotels, restaurants, tours, transport — filterable by category |
| ⭐ **Reviews & ratings** | Average rating breakdown, star-rating filter, write-a-review form with an interactive star picker |
| 🤖 **Smart travel assistant** | Budget / duration / environment-based destination recommendations |
| 📊 **User dashboard** | Favorites, recently viewed, and personalized suggestions (unlocks after login) |
| 🌗 **Light / dark theme toggle** | Persisted with `localStorage` |
| 📱 **Fully responsive** | Mobile, tablet, and desktop breakpoints |
| ♿ **Accessible** | Skip-to-content link, visible focus states, `aria-live` regions, `aria-pressed` / `aria-expanded` states |

<br>

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Structure** | HTML5 |
| **Styling** | CSS3 (custom properties / design tokens, no framework) |
| **Behavior** | Vanilla JavaScript (no build step, no dependencies) |
| **Icons** | Font Awesome (CDN) |
| **Fonts** | Google Fonts — Plus Jakarta Sans & Inter |
| **Persistence** | Browser `localStorage` |

> No bundler, no `npm install`, no build step — everything runs straight from the browser.

<br>

## 📁 Project Structure

```
meridian/
├── index.html      → main HTML structure & page markup
├── style.css       → all styling (design tokens, layout, themes)
├── script.js       → app logic (search, planner, booking, assistant, theme toggle)
├── Images/         → destination, service, and review photos
└── README.md       → this file
```

<br>

## 🚀 Getting Started

1. Clone or download this repository.
2. Make sure `style.css`, `script.js`, and the `Images/` folder all sit next to `index.html`.
3. Open `index.html` directly in any modern browser — no install, no server, no build step required.

```bash
git clone <this-repo-url>
cd meridian
open index.html   # or double-click it
```

<br>

## ✅ Task 8 — What Changed in This Final Version

This final submission combined every previous week's code without altering it, then closed out the remaining Week 8 requirements:

| Area | What was added / fixed |
|---|---|
| **Home page** | Added a dedicated, always-visible call-to-action section (previously the only sign-up prompt was gated inside the login-locked dashboard) |
| **Destination details** | Added the missing "Suggested duration" field to all 12 destinations and the detail modal |
| **Explore section** | Added sort control (Recommended / Rating / Price) alongside existing search & trail filters |
| **Theme** | Added a light/dark mode toggle, persisted in `localStorage` |
| **Dark mode contrast** | Fixed ~30 hardcoded backgrounds (`#fff`, `rgba(255,255,255,...)`) that stayed white regardless of theme while their text adapted — was causing invisible/low-contrast text on cards, inputs, the nav bar, and the detail-page topbar |
| **Button rendering** | Fixed a root-cause bug: `.btn--outline` (Reset, Close, View details, Add to planned trips, etc.) never declared a `background`, so it fell back to the browser's default opaque button fill instead of being transparent — invisible text in dark mode. Fixed at the shared `.btn` base class |
| **Solid buttons/badges** | Split the reused `--accent` token into an adaptive text/link color and a fixed `--accent-solid` background color, so buttons like "Book now", toasts, and the CTA band stay legible in both themes |
| **Photo overlay icons** | Fixed the favorite-heart and gallery-arrow icons, which sat on a fixed light circle but used theme-adaptive text color — now fixed to a legible dark icon in both themes |
| **Documentation** | Added this README and an in-file project-summary comment block |

Verified after every change: no duplicate element IDs, all HTML tags balanced, JavaScript passes a syntax check.

<br>

## ⚠️ Known Limitations

- Destination photos reference a local `Images/` folder — make sure it's included when cloning or submitting.
- No backend/API — all data (destinations, services, reviews) is defined inline in JavaScript; accounts and saved data live only in the browser's `localStorage`.
- No interactive map view (kept out of scope to avoid adding an external mapping dependency).

<br>

## 🔭 Future Improvements

- Interactive map view for destinations
- Richer recommendation logic based on booking history
- Move destination/service data to a small backend or API

<br>

## 🎓 Internship Context

**CODIORA House (Private) Limited** — 2-Month Remote Internship, Batch 3
**Week 8 — Final Professional Project** — Travel & Tourism Experience Platform

<br>

## 👤 Author

**Iqra Noor**

<br>

## 🔗 Links

**Live Project Link:** [https://iqra-noor-codiora-house-final-task-8.netlify.app](https://iqra-noor-codiora-house-final-task-8.netlify.app)

**Demo Video:** Task 8 Meridian Demo.mp4

<div align="center">
<br>

⭐ *If you like this project, consider giving it a star!* ⭐

</div>
