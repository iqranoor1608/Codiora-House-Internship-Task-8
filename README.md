# Codiora-House-Internship-Task-8

🧭 Meridian — Travel & Tourism Experience Platform
> Travel, mapped for who you are.
Meridian is a single-file HTML/CSS/JavaScript travel discovery platform built over an 8-week internship and finalized in Week 8 — Final Professional Project. It combines destination discovery, trip planning, service booking, reviews, and a smart recommendation assistant into one polished, responsive, light/dark-mode-aware product.
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Build Step](https://img.shields.io/badge/Build-None%20required-success)
![Status](https://img.shields.io/badge/Status-Final%20Submission-blue)
---
📑 Table of Contents
About
Features
Tech Stack
Project Structure
Getting Started
Task 8 — What Changed in This Final Version
Known Limitations
Future Improvements
Internship Context
Author
---
📖 About
Travel sites usually make people re-filter the same preferences every visit. Meridian remembers saved destinations, recently viewed places, and trip plans locally (via `localStorage`), and uses that history to recommend places worth looking at next — no account or backend required to try it.
✨ Features
🏠 Home page — hero/banner, quick search & booking bar, featured-destination carousel, popular destinations, call-to-action section
🌍 Destinations / Explore — search, trail filtering, and sort by rating or price
📍 Destination detail pages — photo gallery, description, highlights, price, rating, and suggested trip duration
🧳 Trip planner — build a multi-day itinerary with activities per day
🛎️ Travel services & booking — hotels, restaurants, tours, transport, filterable by category
⭐ Reviews & ratings — average rating breakdown, star-rating filter, write-a-review form with an interactive star picker
🤖 Smart travel assistant — budget/duration/environment-based destination recommendations
📊 User dashboard — favorites, recently viewed, and personalized suggestions (unlocks after login)
🌗 Light / dark theme toggle — persisted with `localStorage`
📱 Fully responsive — mobile, tablet, and desktop breakpoints
♿ Accessible — skip-to-content link, visible focus states, `aria-live` regions, `aria-pressed`/`aria-expanded` states
🛠 Tech Stack
Layer	Technology
Structure	HTML5
Styling	CSS3 (custom properties / design tokens, no framework)
Behavior	Vanilla JavaScript (no build step, no dependencies)
Icons	Font Awesome (CDN)
Fonts	Google Fonts — Plus Jakarta Sans & Inter
Persistence	Browser `localStorage`
No bundler, no `npm install`, no build step — everything runs straight from the browser.
📁 Project Structure
```
index.html   → HTML
style.css   → CSS
script.js   → JavaScript
images/               → destination, service, and review photos referenced by the app
README.md             → this file
```
🚀 Getting Started
Clone or download this repository.
Make sure the `images/` folder sits next to `index.html`.
Open `index.html` directly in any modern browser — no install, no server, no build step required.
```bash
git clone <this-repo-url>
cd meridian
open index.html   # or double-click it
```
✅ Task 8 — What Changed in This Final Version
This final submission combined every previous week's code without altering it, then closed out the remaining Week 8 requirements:
Area	What was added / fixed
Home page	Added a dedicated, always-visible call-to-action section (previously the only sign-up prompt was gated inside the login-locked dashboard)
Destination details	Added the missing "Suggested duration" field to all 12 destinations and the detail modal
Explore section	Added sort control (Recommended / Rating / Price) alongside existing search & trail filters
Theme	Added a light/dark mode toggle, persisted in `localStorage`
Dark mode contrast	Fixed ~30 hardcoded backgrounds (`#fff`, `rgba(255,255,255,...)`) that stayed white regardless of theme while their text adapted — was causing invisible/low-contrast text on cards, inputs, the nav bar, and the detail-page topbar
Button rendering	Fixed a root-cause bug: `.btn--outline` (Reset, Close, View details, Add to planned trips, etc.) never declared a `background`, so it fell back to the browser's default opaque button fill instead of being transparent — invisible text in dark mode. Fixed at the shared `.btn` base class
Solid buttons/badges	Split the reused `--accent` token into an adaptive text/link color and a fixed `--accent-solid` background color, so buttons like "Book now", toasts, and the CTA band stay legible in both themes
Photo overlay icons	Fixed the favorite-heart and gallery-arrow icons, which sat on a fixed light circle but used theme-adaptive text color — now fixed to a legible dark icon in both themes
Documentation	Added this README and an in-file project-summary comment block
Verified after every change: no duplicate element IDs, all HTML tags balanced, JavaScript passes a syntax check.
⚠️ Known Limitations
Destination photos reference a local `images/` folder — make sure it's included when cloning or submitting.
No backend/API — all data (destinations, services, reviews) is defined inline in JavaScript; accounts and saved data live only in the browser's `localStorage`.
No interactive map view (kept out of scope to avoid adding an external mapping dependency).
🔭 Future Improvements
Interactive map view for destinations
Richer recommendation logic based on booking history
Move destination/service data to a small backend or API
🎓 Internship Context
CODIORA House (Private) Limited — 2-Month Remote Internship, Batch 3
Week 8 — Final Professional Project — Travel & Tourism Experience Platform
👤 Author
Iqra Noor
