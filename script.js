/* ==========================================================
          MERIDIAN — app logic
          Week 3: profiles, favorites, dashboard, localStorage, toasts
          ========================================================== */

/* ---------- Data ---------- */
const DESTINATIONS = [
    { id: "amazon-rainforest", name: "Amazon Rainforest", region: "Brazil", image: "images/Aerial_view_of_the_Amazon_Rainforest.jpg", trail: "Adventure", rating: 4.6, price: 890, duration: "6–8 days", season: "Jun–Nov", palette: ["#1f6b3a", "#e3f0e6"], desc: "A living canopy of rivers and rainforest sound, home to more species than anywhere else on Earth and best explored slowly by boat and on foot.", highlights: ["Sunrise canoe on a blackwater river", "Night walk for wildlife spotting", "Stay in a stilted jungle lodge"] },
    { id: "banff", name: "Banff", region: "Canada", image: "images/banff national park.webp", trail: "Mountain", rating: 4.9, price: 860, duration: "5–7 days", season: "Jun–Sep", palette: ["#2f6b52", "#e6f0ea"], desc: "Turquoise glacial lakes ringed by the Canadian Rockies, with trailheads that start a few minutes from town.", highlights: ["Lake Louise canoe morning", "Icefields Parkway drive", "Sulphur Mountain gondola"] },
    { id: "chile", name: "Patagonia", region: "Chile", image: "images/chile.webp", trail: "Adventure", rating: 4.8, price: 1620, duration: "8–10 days", season: "Nov–Mar", palette: ["#39586b", "#e6edf1"], desc: "Windswept granite spires, glacial lakes, and long trails through some of the last truly wild landscapes left on the continent.", highlights: ["Torres del Paine trek", "Glacier boat crossing", "Estancia horseback ride"] },
    { id: "reykjavik", name: "Reykjavik", region: "Iceland", image: "images/iceland.webp", trail: "Adventure", rating: 4.7, price: 1050, duration: "5–6 days", season: "Jun–Aug / Sep–Mar", palette: ["#3a4a63", "#e7eaf0"], desc: "Geothermal lagoons, black sand coastlines, and easy access to glaciers, waterfalls, and — in season — the northern lights.", highlights: ["Blue Lagoon soak", "Golden Circle route", "Northern lights hunt"] },
    { id: "maldives", name: "Maldives", region: "Indian Ocean", image: "images/maldives.jpg", trail: "Beach", rating: 4.9, price: 2100, duration: "5–7 days", season: "Nov–Apr", palette: ["#2e8fa3", "#e4f3f5"], desc: "Overwater bungalows and reef lagoons across a scatter of coral atolls built for slowing all the way down.", highlights: ["Overwater villa stay", "Manta ray night dive", "Private sandbank picnic"] },
    { id: "marrakech", name: "Marrakech", region: "Morocco", image: "images/moroco.jpeg", trail: "Culture", rating: 4.6, price: 610, duration: "4–5 days", season: "Oct–Apr", palette: ["#c17a2e", "#f6ece1"], desc: "A maze of souks, riads, and spice stalls opening onto the palm-lined calm of the Atlas foothills.", highlights: ["Jemaa el-Fnaa night market", "Majorelle Garden", "Atlas mountains day trip"] },
    { id: "machu-picchu", name: "Machu Picchu", region: "Peru", image: "images/peru.jpg", trail: "Adventure", rating: 4.9, price: 1380, duration: "6–8 days", season: "May–Sep", palette: ["#4d6b3f", "#eef2e8"], desc: "An Incan citadel set on a ridge above the Urubamba valley, reached by cloud-forest trails and switchback rail.", highlights: ["Sunrise over the citadel", "Inca Trail trek", "Sacred Valley villages"] },
    { id: "petra", name: "Petra", region: "Jordan", image: "images/petra.webp", trail: "Culture", rating: 4.8, price: 540, duration: "3–4 days", season: "Mar–May / Sep–Nov", palette: ["#a8562e", "#f7e6da"], desc: "A rose-red city carved into sandstone cliffs, revealed through a narrow canyon before opening onto ancient temple facades and tombs.", highlights: ["Walk the Siq at sunrise", "Treasury facade at golden hour", "Monastery hike above the valley"] },
    { id: "santorini", name: "Santorini", region: "Greece", image: "images/santorini.jpg", trail: "Beach", rating: 4.9, price: 1240, duration: "4–6 days", season: "Apr–Oct", palette: ["#3b6ea5", "#e9f0f5"], desc: "Whitewashed villages stacked above a sunken volcanic caldera, with blue-domed churches and cliffside sunsets that draw travelers back year after year.", highlights: ["Caldera-view suites in Oia", "Volcanic wine tasting", "Sunset sailing to the red beach"] },
    { id: "swiss-alps", name: "Swiss Alps", region: "Switzerland", image: "images/swiss alps.avif", trail: "Mountain", rating: 4.8, price: 1450, duration: "6–8 days", season: "Jun–Sep / Dec–Mar", palette: ["#3a5d7a", "#eaf1f7"], desc: "Jagged snow-capped peaks, turquoise alpine lakes, and cable cars that climb straight from lakeside villages into thin, bright air.", highlights: ["Matterhorn viewpoint hike", "Scenic train through the Alps", "Fondue night in a mountain hut"] },
    { id: "kyoto", name: "Kyoto", region: "Japan", image: "images/Torii,_Fushimi_Inari-Taisha kyoto.jpg", trail: "Culture", rating: 4.8, price: 980, duration: "5–6 days", season: "Mar–May", palette: ["#b0455e", "#f6e6ea"], desc: "A former imperial capital of quiet temples, bamboo groves, and geisha districts where centuries-old ritual still shapes daily life.", highlights: ["Fushimi Inari torii trail", "Arashiyama bamboo grove", "Traditional kaiseki dinner"] },
    { id: "serengeti", name: "Serengeti", region: "Tanzania", image: "images/Wildebeest_Migration_in_Serengeti_National_Park,_Tanzania.jpg", trail: "Safari", rating: 4.9, price: 1980, duration: "5–6 days", season: "Jun–Oct", palette: ["#c99a3e", "#f8f0dd"], desc: "Endless golden plains that come alive each year with one of the planet's largest wildlife migrations.", highlights: ["Great Migration river crossing", "Sunrise game drive", "Maasai village visit"] },
];

const TRAILS = ["All", "Beach", "Mountain", "Culture", "Adventure", "Safari"];
const FEATURED_IDS = ["santorini", "banff", "maldives"];

/* ---------- Storage helpers ---------- */
const store = {
    get(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
    }
};

const DEFAULT_PROFILE = { name: "Traveler", bio: "", image: "" };

let favorites = [];
let recent = [];
let plannedTrips = [];
let profile = { ...DEFAULT_PROFILE };

/* ---------- Auth ---------- */
// NOTE: this is a client-side demo. Passwords are hashed with a small,
// non-cryptographic hash purely so raw passwords aren't sitting in
// localStorage — it is NOT secure and should never be used for a real
// production login system (that needs a real backend + proper hashing).
function hashPassword(pw) {
    let h = 5381;
    for (let i = 0; i < pw.length; i++) {
        h = ((h << 5) + h) + pw.charCodeAt(i);
        h |= 0;
    }
    return "h" + h.toString(36);
}

function normalizeEmail(email) { return email.trim().toLowerCase(); }

let users = store.get("meridian_users", {});
let currentEmail = store.get("meridian_session", null);
let currentUser = null;

function persistUsers() { store.set("meridian_users", users); }

function loadUserIntoState(user) {
    favorites = [...(user.favorites || [])];
    recent = [...(user.recent || [])];
    plannedTrips = [...(user.planned || [])];
    profile = { ...DEFAULT_PROFILE, ...(user.profile || {}) };
}

function saveStateToCurrentUser() {
    if (!currentUser) return;
    currentUser.favorites = favorites;
    currentUser.recent = recent;
    currentUser.planned = plannedTrips;
    currentUser.profile = profile;
    users[currentUser.email] = currentUser;
    persistUsers();
}

function isLoggedIn() { return !!currentUser; }

function signup(name, email, password) {
    const normEmail = normalizeEmail(email);
    if (users[normEmail]) return { ok: false, error: "An account with that email already exists." };
    const user = {
        email: normEmail,
        passHash: hashPassword(password),
        favorites: [],
        recent: [],
        planned: [],
        profile: { name: name.trim() || "Traveler", bio: "", image: "" }
    };
    users[normEmail] = user;
    persistUsers();
    return { ok: true, user };
}

function login(email, password) {
    const normEmail = normalizeEmail(email);
    const user = users[normEmail];
    if (!user || user.passHash !== hashPassword(password)) {
        return { ok: false, error: "That email and password don't match." };
    }
    return { ok: true, user };
}

function setSession(user) {
    currentUser = user;
    currentEmail = user.email;
    store.set("meridian_session", currentEmail);
    loadUserIntoState(user);
}

function logout() {
    currentUser = null;
    currentEmail = null;
    store.set("meridian_session", null);
    favorites = [];
    recent = [];
    plannedTrips = [];
    profile = { ...DEFAULT_PROFILE };
    closeProfile();
    renderAuthUI();
    renderAll();
    toast("Logged out");
    document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" });
}

function requireAuth(message) {
    if (isLoggedIn()) return true;
    toast(message || "Log in to do that");
    openAuth("login");
    return false;
}

let activeTrail = "All";
let searchTerm = "";
let sortBy = "recommended"; // Task 8: advanced filtering
let carouselIndex = 0;
let galleryIndex = 0;
let galleryCount = 1;

/* ---------- SVG placeholder art ---------- */
/* variant shifts the sun position and wave curves so each image in a
   destination's gallery reads as visually distinct, while still sharing
   that destination's color palette. */
function placeholderSvg(id, [c1, c2], variant = 0) {
    const layouts = [
        { sun: [330, 55], w1: "M0 210 Q100 170 200 205 T400 195", w2: "M0 245 Q120 210 220 240 T400 225" },
        { sun: [70, 60], w1: "M0 190 Q110 230 220 190 T400 205", w2: "M0 235 Q130 260 240 230 T400 240" },
        { sun: [200, 45], w1: "M0 200 Q100 150 200 195 T400 180", w2: "M0 240 Q140 205 260 235 T400 220" },
    ];
    const L = layouts[variant % layouts.length];
    const gid = `g-${id}-${variant}`;
    return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${c1}"/>
            <stop offset="1" stop-color="${c2}"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#${gid})"/>
        <circle cx="${L.sun[0]}" cy="${L.sun[1]}" r="26" fill="#ffffff" opacity="0.55"/>
        <path d="${L.w1} V300 H0 Z" fill="#ffffff" opacity="0.5"/>
        <path d="${L.w2} V300 H0 Z" fill="#ffffff" opacity="0.35"/>
      </svg>`;
}

/* Renders a destination's real photo (images/<id>.jpg) with the
   generated placeholder art as an automatic fallback if the file is
   missing — so the site still looks right even before photos are added.
   Drop images into an "images" folder next to this HTML file, named
   to match each destination's id (see DESTINATIONS above), e.g.
   images/santorini.jpg. Different extension? just edit the "image"
   field on that destination. */
function destPhoto(d, variant = 0) {
    return `<img src="${d.image}" alt="${d.name}, ${d.region}" loading="lazy" class="dest-photo"
        data-dest-id="${d.id}" data-variant="${variant}" onerror="handleImgError(this)">`;
}

function handleImgError(imgEl) {
    const d = byId(imgEl.dataset.destId);
    if (!d) return;
    const variant = Number(imgEl.dataset.variant || 0);
    const wrap = document.createElement("div");
    wrap.innerHTML = placeholderSvg(`${d.id}-fallback-${variant}`, d.palette, variant);
    const svgEl = wrap.firstElementChild;
    svgEl.classList.add("dest-photo");
    imgEl.replaceWith(svgEl);
}

/* Builds a 3-image gallery for a destination's detail view. The first
   slide uses the real photo (with placeholder fallback); the other two
   reuse the generated art in different compositions for now — swap
   destinationGallery() to point at more real files once you have them. */
function destinationGallery(d) {
    return [destPhoto(d, 0), placeholderSvg(`gallery-${d.id}`, d.palette, 1), placeholderSvg(`gallery-${d.id}`, d.palette, 2)];
}

function byId(id) { return DESTINATIONS.find(d => d.id === id); }

/* ---------- Toasts ---------- */
function toast(message) {
    const stack = document.getElementById("toastStack");
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => {
        el.classList.add("is-leaving");
        setTimeout(() => el.remove(), 250);
    }, 2600);
}

/* ---------- Favorites ---------- */
function isFav(id) { return favorites.includes(id); }

function toggleFavorite(id, evt) {
    if (evt) evt.stopPropagation();
    if (!requireAuth("Log in to save favorites")) return;
    const d = byId(id);
    if (isFav(id)) {
        favorites = favorites.filter(f => f !== id);
        toast(`Removed ${d.name} from favorites`);
    } else {
        favorites = [...favorites, id];
        toast(`Saved ${d.name} to favorites`);
    }
    saveStateToCurrentUser();
    renderAll();
}

function isPlanned(id) { return plannedTrips.includes(id); }

function togglePlanned(id) {
    if (!requireAuth("Log in to plan trips")) return;
    const d = byId(id);
    if (isPlanned(id)) {
        plannedTrips = plannedTrips.filter(f => f !== id);
        toast(`Removed ${d.name} from planned trips`);
    } else {
        plannedTrips = [...plannedTrips, id];
        toast(`Added ${d.name} to planned trips`);
    }
    saveStateToCurrentUser();
    renderProfile();
}

/* ---------- Recently viewed ---------- */
function pushRecent(id) {
    if (!isLoggedIn()) return;
    recent = [id, ...recent.filter(r => r !== id)].slice(0, 6);
    saveStateToCurrentUser();
}

/* ---------- Card builder ---------- */
function favIconSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/>
      </svg>`;
}

function destinationCard(d) {
    const fav = isFav(d.id);
    return `
        <article class="rcard" data-id="${d.id}" tabindex="0" role="button" aria-label="View ${d.name}">
          <div class="rcard__img">
            ${destPhoto(d)}
            <span class="rcard__badge">${d.trail}</span>
            <button class="rcard__fav ${fav ? "is-fav" : ""}" data-fav="${d.id}" aria-label="${fav ? "Remove from" : "Add to"} favorites">
              ${favIconSvg()}
            </button>
          </div>
          <div class="rcard__body">
            <div class="rcard__name">${d.name}</div>
            <div class="rcard__loc">${d.region}</div>
            <div class="rcard__meta">
              <span class="rcard__rating"><span class="star">★</span> ${d.rating}</span>
              <span class="rcard__price">$${d.price}</span>
            </div>
          </div>
        </article>`;
}

function miniCard(d) {
    return `
        <article class="dash-mini" data-id="${d.id}" tabindex="0" role="button" aria-label="View ${d.name}">
          <div class="dash-mini__img">${destPhoto(d, 1)}</div>
          <div class="dash-mini__body">
            <b>${d.name}</b>
            <p>${d.region} · ★ ${d.rating}</p>
          </div>
        </article>`;
}

/* ---------- Render: hero visual / about visual ---------- */
function renderStaticVisuals() {
    document.getElementById("heroVisual").innerHTML =
        `<img src="images/iceland.webp" alt="Glacier ice cave, Iceland" loading="lazy" class="dest-photo"
           onerror="this.onerror=null; this.outerHTML=placeholderSvg('hero', ['#17233b','#2e3f63']);">` +
        `<span class="hero__chip hero__chip--rating"><span class="star">★</span> 4.9 average</span>
         <span class="hero__chip hero__chip--people">👤 12,400+ travelers</span>`;
    document.getElementById("aboutVisual").innerHTML =
        `<img src="images/travel_the_world.jpg" alt="Landmarks from around the world" loading="lazy" class="dest-photo"
           onerror="this.onerror=null; this.outerHTML=placeholderSvg('about', ['#e3a23c','#f7f0e2']);">`;
}

/* ---------- Render: carousel ---------- */
function renderCarousel() {
    const track = document.getElementById("carTrack");
    const dots = document.getElementById("carDots");
    track.innerHTML = FEATURED_IDS.map(id => {
        const d = byId(id);
        const fav = isFav(d.id);
        return `
          <div class="carousel__slide">
            <div class="carousel__slide-media">${destPhoto(d, 2)}</div>
            <div class="carousel__slide-body">
              <span class="eyebrow">${d.trail} · ${d.region}</span>
              <h3>${d.name}</h3>
              <p>${d.desc}</p>
              <div class="carousel__slide-meta">★ ${d.rating} rating · from $${d.price} / person</div>
              <div class="carousel__slide-actions">
                <button class="btn btn--dark" data-view="${d.id}">View destination</button>
                <button class="btn btn--outline" data-fav="${d.id}">${fav ? "Saved ♥" : "Save to favorites"}</button>
              </div>
            </div>
          </div>`;
    }).join("");
    track.style.transform = `translateX(-${carouselIndex * 100}%)`;

    dots.innerHTML = FEATURED_IDS.map((_, i) =>
        `<button class="${i === carouselIndex ? "is-active" : ""}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>`
    ).join("");
}

/* ---------- Render: trail pills ---------- */
function renderPills() {
    document.getElementById("trailPills").innerHTML = TRAILS.map(t =>
        `<button class="trail-pill ${t === activeTrail ? "is-active" : ""}" data-trail="${t}">${t}</button>`
    ).join("");
}

/* ---------- Render: all destinations grid ---------- */
function renderGrid() {
    const grid = document.getElementById("allGrid");
    const term = searchTerm.trim().toLowerCase();
    const filtered = DESTINATIONS.filter(d => {
        const matchesTrail = activeTrail === "All" || d.trail === activeTrail;
        const matchesSearch = !term || d.name.toLowerCase().includes(term) || d.region.toLowerCase().includes(term);
        return matchesTrail && matchesSearch;
    });

    // Task 8: advanced filtering — sort the filtered results
    if (sortBy === "rating-desc") filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);

    document.getElementById("resultCount").textContent = `${filtered.length} destination${filtered.length === 1 ? "" : "s"}`;

    grid.innerHTML = filtered.length
        ? filtered.map(destinationCard).join("")
        : `<div class="empty-state">No destinations match your search. Try a different trail or keyword.</div>`;
}

/* ---------- Render: dashboard ---------- */
function renderDashboard() {
    const locked = document.getElementById("dashLocked");
    const content = document.getElementById("dashContent");
    if (!isLoggedIn()) {
        locked.classList.add("is-visible");
        content.classList.add("is-hidden");
        document.getElementById("favCount").textContent = "0";
        document.getElementById("heroFavStat").textContent = "0";
        return;
    }
    locked.classList.remove("is-visible");
    content.classList.remove("is-hidden");

    const recentIds = recent.filter(id => byId(id));
    const favIds = favorites.filter(id => byId(id));
    const recIds = DESTINATIONS
        .filter(d => !favIds.includes(d.id))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)
        .map(d => d.id);

    document.getElementById("recentRow").innerHTML = recentIds.map(id => miniCard(byId(id))).join("");
    document.getElementById("recentEmpty").style.display = recentIds.length ? "none" : "inline";

    document.getElementById("favRow").innerHTML = favIds.map(id => miniCard(byId(id))).join("");
    document.getElementById("favEmpty").style.display = favIds.length ? "none" : "inline";

    document.getElementById("recRow").innerHTML = recIds.map(id => miniCard(byId(id))).join("");

    document.getElementById("favCount").textContent = favorites.length;
    document.getElementById("heroFavStat").textContent = favorites.length;

    renderQuickNav();
}

/* ---------- Render: profile ---------- */
function initials(name) {
    return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("") || "A";
}

function renderProfile() {
    document.getElementById("profileNameDisplay").textContent = profile.name;
    document.getElementById("profileBioDisplay").textContent = profile.bio;
    document.getElementById("profileNameInput").value = profile.name;
    document.getElementById("profileBioInput").value = profile.bio;

    const initial = initials(profile.name);
    document.getElementById("navUserName").textContent = profile.name;
    [document.getElementById("profileAvatarNav"), document.getElementById("profileAvatarBig")].forEach(el => {
        if (profile.image) {
            el.style.backgroundImage = `url("${profile.image}")`;
            el.textContent = "";
        } else {
            el.style.backgroundImage = "";
            el.textContent = initial;
        }
    });

    document.getElementById("statFavCount").textContent = favorites.length;
    document.getElementById("statTripCount").textContent = plannedTrips.length;
    document.getElementById("statViewedCount").textContent = recent.length;
}

/* ---------- Quick navigation cards ---------- */
function quickNavIcon(path) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${path}</svg>`;
}

function renderQuickNav() {
    const items = [
        { label: "Featured resorts", sub: "Curated for the season", icon: '<path d="M4 4h16v16H4z"/><path d="m4 15 5-5 4 4 7-7"/>', action: () => document.querySelector("#featured").scrollIntoView({ behavior: "smooth" }) },
        { label: "All destinations", sub: `${DESTINATIONS.length} places to explore`, icon: '<circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>', action: () => document.querySelector("#trails").scrollIntoView({ behavior: "smooth" }) },
        { label: "Your favorites", sub: `${favorites.length} saved`, icon: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/>', action: () => document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth" }) },
        { label: "Your profile", sub: "Edit name, photo & bio", icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>', action: openProfile },
    ];
    const row = document.getElementById("quickNavRow");
    row.innerHTML = items.map((it, i) =>
        `<button class="quicknav-card" data-quicknav="${i}">
          <span class="quicknav-card__icon">${quickNavIcon(it.icon)}</span>
          <span class="quicknav-card__text"><b>${it.label}</b><span>${it.sub}</span></span>
        </button>`
    ).join("");
    row.querySelectorAll("[data-quicknav]").forEach((btn, i) => {
        btn.addEventListener("click", items[i].action);
    });
}

function renderAll() {
    renderCarousel();
    renderPills();
    renderGrid();
    renderDashboard();
    renderProfile();
    renderPlanner();
}

/* ---------- Destination detail modal ---------- */
function renderGallery(d) {
    const images = destinationGallery(d);
    galleryCount = images.length;
    galleryIndex = 0;

    document.getElementById("modalGalleryTrack").innerHTML =
        images.map(svg => `<div>${svg}</div>`).join("");

    document.getElementById("modalGalleryDots").innerHTML =
        images.map((_, i) => `<button class="${i === 0 ? "is-active" : ""}" data-gallery-dot="${i}" aria-label="Photo ${i + 1}"></button>`).join("");

    updateGalleryPosition();
}

function updateGalleryPosition() {
    const track = document.getElementById("modalGalleryTrack");
    track.style.transform = `translateX(-${galleryIndex * 100}%)`;
    document.querySelectorAll("#modalGalleryDots button").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === galleryIndex);
    });
}

function galleryStep(dir) {
    galleryIndex = (galleryIndex + dir + galleryCount) % galleryCount;
    updateGalleryPosition();
}

function openDetail(id) {
    const d = byId(id);
    if (!d) return;
    pushRecent(id);

    renderGallery(d);
    document.getElementById("modalTag").textContent = `${d.trail} · ${d.region}`;
    document.getElementById("modalName").textContent = d.name;
    document.getElementById("modalDesc").textContent = d.desc;
    document.getElementById("modalHighlights").innerHTML = d.highlights.map(h => `<li>${h}</li>`).join("");
    document.getElementById("modalPrice").textContent = `$${d.price}`;
    document.getElementById("modalRating").textContent = `★ ${d.rating}`;
    document.getElementById("modalDuration").textContent = d.duration;
    document.getElementById("modalSeason").textContent = d.season;
    document.getElementById("modalTrail").textContent = d.trail;
    document.getElementById("detailCrumb").textContent = `Destinations / ${d.name}`;

    const favBtn = document.getElementById("modalFavBtn");
    favBtn.textContent = isFav(id) ? "Saved to favorites ♥" : "Save to favorites";
    favBtn.onclick = () => { toggleFavorite(id); favBtn.textContent = isFav(id) ? "Saved to favorites ♥" : "Save to favorites"; };

    const planBtn = document.getElementById("modalPlanBtn");
    planBtn.textContent = isPlanned(id) ? "Added to planned trips ✓" : "Add to planned trips";
    planBtn.onclick = () => { togglePlanned(id); planBtn.textContent = isPlanned(id) ? "Added to planned trips ✓" : "Add to planned trips"; };

    document.getElementById("detailModal").hidden = false;
    document.body.style.overflow = "hidden";
    renderDashboard();
}

function closeDetail() {
    document.getElementById("detailModal").hidden = true;
    document.body.style.overflow = "";
}

/* ---------- Profile modal ---------- */
function openProfile() {
    if (!requireAuth("Log in to view your profile")) return;
    renderProfile();
    document.getElementById("profileModal").hidden = false;
    document.body.style.overflow = "hidden";
}

function closeProfile() {
    document.getElementById("profileModal").hidden = true;
    document.body.style.overflow = "";
}

/* ---------- Auth modal ---------- */
function setAuthTab(tab) {
    const isLogin = tab === "login";
    document.getElementById("authTabLogin").classList.toggle("is-active", isLogin);
    document.getElementById("authTabSignup").classList.toggle("is-active", !isLogin);
    document.getElementById("loginForm").classList.toggle("is-active", isLogin);
    document.getElementById("signupForm").classList.toggle("is-active", !isLogin);
    document.getElementById("authSwitchLogin").style.display = isLogin ? "block" : "none";
    document.getElementById("authSwitchSignup").style.display = isLogin ? "none" : "block";
    document.getElementById("authIntro").textContent = isLogin
        ? "Log in to see your saved destinations and dashboard."
        : "Create a free account to save destinations and personalize your trip.";
    document.getElementById("loginError").classList.remove("is-visible");
    document.getElementById("signupError").classList.remove("is-visible");
}

function openAuth(tab) {
    setAuthTab(tab || "login");
    document.getElementById("authModal").hidden = false;
    document.body.style.overflow = "hidden";
}

function closeAuth() {
    document.getElementById("authModal").hidden = true;
    document.body.style.overflow = "";
    document.getElementById("loginForm").reset();
    document.getElementById("signupForm").reset();
}

function showAuthError(id, message) {
    const el = document.getElementById(id);
    el.textContent = message;
    el.classList.add("is-visible");
}

function renderAuthUI() {
    const authBtn = document.getElementById("authNavBtn");
    const userBtn = document.getElementById("profileBtn");
    authBtn.hidden = isLoggedIn();
    userBtn.hidden = !isLoggedIn();
}

/* ---------- Event wiring ---------- */
document.addEventListener("click", (e) => {
    const gotoBtn = e.target.closest("[data-goto]");
    if (gotoBtn) {
        const sel = gotoBtn.getAttribute("data-goto");
        if (sel === "#dashboard" && !requireAuth("Log in to see your dashboard")) return;
        document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
        return;
    }

    const authOpenBtn = e.target.closest("[data-auth-open]");
    if (authOpenBtn) { openAuth(authOpenBtn.getAttribute("data-auth-open")); return; }

    const authTabBtn = e.target.closest("[data-auth-tab]");
    if (authTabBtn) { setAuthTab(authTabBtn.getAttribute("data-auth-tab")); return; }

    const favBtn = e.target.closest("[data-fav]");
    if (favBtn) { toggleFavorite(favBtn.getAttribute("data-fav"), e); return; }

    const viewBtn = e.target.closest("[data-view]");
    if (viewBtn) { openDetail(viewBtn.getAttribute("data-view")); return; }

    const card = e.target.closest(".rcard, .dash-mini");
    if (card) { openDetail(card.getAttribute("data-id")); return; }

    const trailBtn = e.target.closest("[data-trail]");
    if (trailBtn) { activeTrail = trailBtn.getAttribute("data-trail"); renderPills(); renderGrid(); return; }

    const dot = e.target.closest("[data-dot]");
    if (dot) { carouselIndex = Number(dot.getAttribute("data-dot")); renderCarousel(); return; }

    const galleryDot = e.target.closest("[data-gallery-dot]");
    if (galleryDot) { galleryIndex = Number(galleryDot.getAttribute("data-gallery-dot")); updateGalleryPosition(); return; }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const card = e.target.closest(".rcard, .dash-mini");
        if (card) openDetail(card.getAttribute("data-id"));
    }
    if (e.key === "Escape") { closeDetail(); closeProfile(); closeAuth(); }
});

document.getElementById("searchInput").addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderGrid();
});

// Task 8: advanced filtering — sort control
document.getElementById("sortSelect").addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderGrid();
});

// Task 8: light/dark theme toggle, persisted with localStorage
(function initTheme() {
    const toggle = document.getElementById("themeToggle");
    const saved = store.get("meridian_theme", "light");
    applyTheme(saved);

    toggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        store.set("meridian_theme", next);
    });

    function applyTheme(mode) {
        if (mode === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        toggle.setAttribute("aria-pressed", String(mode === "dark"));
    }
})();

document.getElementById("carPrev").addEventListener("click", () => {
    carouselIndex = (carouselIndex - 1 + FEATURED_IDS.length) % FEATURED_IDS.length;
    renderCarousel();
});
document.getElementById("carNext").addEventListener("click", () => {
    carouselIndex = (carouselIndex + 1) % FEATURED_IDS.length;
    renderCarousel();
});

document.getElementById("galleryPrev").addEventListener("click", () => galleryStep(-1));
document.getElementById("galleryNext").addEventListener("click", () => galleryStep(1));

document.getElementById("navToggle").addEventListener("click", () => {
    const isOpen = document.getElementById("navLinks").classList.toggle("is-open");
    document.getElementById("navToggle").setAttribute("aria-expanded", String(isOpen));
});
document.getElementById("navLinks").addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("is-open");
    document.getElementById("navToggle").setAttribute("aria-expanded", "false");
});
/* Platform optimization (Task 7): close the mobile nav on Escape so
   keyboard users aren't stuck with it open. */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.getElementById("navLinks").classList.contains("is-open")) {
        document.getElementById("navLinks").classList.remove("is-open");
        document.getElementById("navToggle").setAttribute("aria-expanded", "false");
    }
});

document.getElementById("detailBack").addEventListener("click", closeDetail);
document.getElementById("modalCloseBtn").addEventListener("click", closeDetail);

document.getElementById("profileBtn").addEventListener("click", openProfile);
document.getElementById("profileBack").addEventListener("click", closeProfile);
document.getElementById("logoutBtn").addEventListener("click", logout);

document.getElementById("authNavBtn").addEventListener("click", () => openAuth("login"));
document.getElementById("authClose").addEventListener("click", closeAuth);
document.getElementById("authModal").addEventListener("click", (e) => {
    if (e.target.id === "authModal") closeAuth();
});

function submitLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    if (!email.trim() || !password) { showAuthError("loginError", "Please fill in all fields."); return; }
    const result = login(email, password);
    if (!result.ok) { showAuthError("loginError", result.error); return; }
    setSession(result.user);
    closeAuth();
    renderAuthUI();
    renderAll();
    toast(`Welcome back, ${result.user.profile.name.split(" ")[0]}`);
    document.querySelector("#dashboard")?.scrollIntoView({ behavior: "smooth" });
}

function submitSignup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;
    if (!name.trim() || !email.trim() || !password) { showAuthError("signupError", "Please fill in all fields."); return; }
    if (!email.includes("@") || !email.includes(".")) { showAuthError("signupError", "Please enter a valid email."); return; }
    if (password.length < 6) { showAuthError("signupError", "Password must be at least 6 characters."); return; }
    if (password !== confirm) { showAuthError("signupError", "Passwords don't match."); return; }
    const result = signup(name, email, password);
    if (!result.ok) { showAuthError("signupError", result.error); return; }
    setSession(result.user);
    closeAuth();
    renderAuthUI();
    renderAll();
    toast(`Welcome to Meridian, ${result.user.profile.name.split(" ")[0]}`);
    document.querySelector("#dashboard")?.scrollIntoView({ behavior: "smooth" });
}

// Buttons are type="button" (not type="submit") and forms are never
// actually submitted — some embedded/sandboxed previews (in-app file
// viewers, certain webviews) block native form submission even though
// plain click events still work, so we drive everything off clicks
// and handle Enter manually instead of relying on the "submit" event.
document.getElementById("loginSubmitBtn").addEventListener("click", submitLogin);
document.getElementById("signupSubmitBtn").addEventListener("click", submitSignup);
document.getElementById("loginForm").addEventListener("submit", (e) => e.preventDefault());
document.getElementById("signupForm").addEventListener("submit", (e) => e.preventDefault());
document.getElementById("authModal").addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || e.target.tagName !== "INPUT") return;
    e.preventDefault();
    if (document.getElementById("loginForm").classList.contains("is-active")) submitLogin();
    else submitSignup();
});

document.getElementById("profileImageInput").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast("Please choose an image file"); return; }
    const reader = new FileReader();
    reader.onload = () => {
        profile = { ...profile, image: reader.result };
        saveStateToCurrentUser();
        renderProfile();
        toast("Profile photo updated");
    };
    reader.readAsDataURL(file);
});

document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("profileNameInput").value.trim() || "Traveler";
    const bio = document.getElementById("profileBioInput").value.trim();
    profile = { ...profile, name, bio };
    saveStateToCurrentUser();
    renderProfile();
    renderAuthUI();
    toast("Profile updated");
});

document.getElementById("bookingSearchBtn").addEventListener("click", () => {
    const val = document.getElementById("bkDest").value.trim();
    searchTerm = val;
    document.getElementById("searchInput").value = val;
    document.querySelector("#trails").scrollIntoView({ behavior: "smooth" });
    renderGrid();
    toast(val ? `Searching for "${val}"` : "Showing all destinations");
});

/* ==========================================================
   TRIP PLANNER
   Task 4: build, itinerary, activities, summary
   ========================================================== */

const ACTIVITY_CATEGORIES = ["Sightseeing", "Food", "Adventure", "Shopping", "Culture", "Entertainment"];

let currentTrip = store.get("meridian_trip", null);
let openActivityForm = null; // { dayId, activityId | null }

function uid(prefix) {
    return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function persistTrip() {
    store.set("meridian_trip", currentTrip);
}

/* ---- Date helpers ---- */
function parseISODate(str) {
    if (!str) return null;
    const [y, m, d] = str.split("-").map(Number);
    const dt = new Date(y, (m || 1) - 1, d || 1);
    return isNaN(dt.getTime()) ? null : dt;
}

function toISODate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function addDaysToDate(date, n) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + n);
    return copy;
}

function formatDateDisplay(iso) {
    const dt = parseISODate(iso);
    if (!dt) return "";
    return dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatDateShort(iso) {
    const dt = parseISODate(iso);
    if (!dt) return "";
    return dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

// Dynamic trip calculation: inclusive day count between two ISO dates
function calcTripDayCount(startISO, endISO) {
    const start = parseISODate(startISO);
    const end = parseISODate(endISO);
    if (!start || !end) return 0;
    const diff = Math.round((end - start) / 86400000);
    return diff >= 0 ? diff + 1 : 0;
}

function tripStatus(trip) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = parseISODate(trip.startDate);
    const end = parseISODate(trip.endDate);
    if (!start || !end) return { label: "Draft", cls: "status-pill--upcoming" };
    if (today < start) return { label: "Upcoming", cls: "status-pill--upcoming" };
    if (today > end) return { label: "Completed", cls: "status-pill--completed" };
    return { label: "Ongoing", cls: "status-pill--ongoing" };
}

/* ---- Trip / day / activity model ---- */
function generateDaysForTrip(startISO, endISO) {
    const count = calcTripDayCount(startISO, endISO);
    const start = parseISODate(startISO);
    const days = [];
    for (let i = 0; i < count; i++) {
        days.push({
            id: uid("day"),
            date: start ? toISODate(addDaysToDate(start, i)) : null,
            activities: []
        });
    }
    return days;
}

function createTrip(data) {
    currentTrip = {
        id: uid("trip"),
        name: data.name,
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
        travelers: data.travelers,
        description: data.description,
        createdAt: new Date().toISOString(),
        days: generateDaysForTrip(data.startDate, data.endDate)
    };
    persistTrip();
}

// Keeps day dates contiguous from startDate, and keeps trip.endDate in
// sync with the actual number of day cards — so "Number of days" (overview)
// and "Total days" (summary) can never disagree, even after adding/removing days.
function normalizeTripDates(trip) {
    const start = parseISODate(trip.startDate);
    if (start) {
        trip.days.forEach((day, i) => {
            day.date = toISODate(addDaysToDate(start, i));
        });
        const last = trip.days[trip.days.length - 1];
        if (last) trip.endDate = last.date;
    }
}

function addItineraryDay() {
    if (!currentTrip) return;
    currentTrip.days.push({ id: uid("day"), date: null, activities: [] });
    normalizeTripDates(currentTrip);
    persistTrip();
    renderPlanner();
    toast("Day added to itinerary");
}

function removeItineraryDay(dayId) {
    if (!currentTrip) return;
    if (currentTrip.days.length <= 1) {
        toast("A trip needs at least one day");
        return;
    }
    currentTrip.days = currentTrip.days.filter(d => d.id !== dayId);
    normalizeTripDates(currentTrip);
    persistTrip();
    renderPlanner();
    toast("Day removed");
}

function addActivity(dayId, activity) {
    const day = currentTrip.days.find(d => d.id === dayId);
    if (!day) return;
    day.activities.push({ id: uid("act"), ...activity });
    persistTrip();
}

function updateActivity(dayId, activityId, activity) {
    const day = currentTrip.days.find(d => d.id === dayId);
    if (!day) return;
    const idx = day.activities.findIndex(a => a.id === activityId);
    if (idx === -1) return;
    day.activities[idx] = { id: activityId, ...activity };
    persistTrip();
}

function removeActivity(dayId, activityId) {
    const day = currentTrip.days.find(d => d.id === dayId);
    if (!day) return;
    day.activities = day.activities.filter(a => a.id !== activityId);
    persistTrip();
    renderPlanner();
    toast("Activity removed");
}

function totalActivities(trip) {
    return trip.days.reduce((sum, d) => sum + d.activities.length, 0);
}

/* ---- Form validation ---- */
function setFieldError(id, message) {
    const el = document.getElementById(id + "Error");
    if (el) el.textContent = message || "";
}

function validateTripForm(data) {
    let valid = true;
    setFieldError("tripName", "");
    setFieldError("tripDestination", "");
    setFieldError("tripStart", "");
    setFieldError("tripEnd", "");
    setFieldError("tripTravelers", "");

    if (!data.name) { setFieldError("tripName", "Trip name is required."); valid = false; }
    if (!data.destination) { setFieldError("tripDestination", "Destination is required."); valid = false; }

    const start = parseISODate(data.startDate);
    const end = parseISODate(data.endDate);
    if (!data.startDate || !start) { setFieldError("tripStart", "Pick a starting date."); valid = false; }
    if (!data.endDate || !end) { setFieldError("tripEnd", "Pick an ending date."); valid = false; }
    if (start && end && end < start) { setFieldError("tripEnd", "Ending date can't be before the start."); valid = false; }

    if (!data.travelers || data.travelers < 1) { setFieldError("tripTravelers", "At least 1 traveler is required."); valid = false; }

    return valid;
}

function validateActivityForm(data) {
    const errs = {};
    if (!data.name) errs.name = "Activity name is required.";
    if (!data.location) errs.location = "Location is required.";
    if (!data.time) errs.time = "Time is required.";
    return errs;
}

/* ---- Rendering ---- */
function populateDestinationList() {
    const list = document.getElementById("tripDestinationList");
    if (!list) return;
    list.innerHTML = DESTINATIONS.map(d => `<option value="${d.name}, ${d.region}"></option>`).join("");
}

function activityCatClass(cat) {
    return "activity-cat--" + (cat || "sightseeing").toLowerCase();
}

function renderActivityCard(day, activity) {
    return `
        <div class="activity-card" data-activity-id="${activity.id}">
          <div class="activity-card__top">
            <span class="tag-pill ${activityCatClass(activity.category)}">${activity.category}</span>
            <span class="activity-card__time">${activity.time}</span>
          </div>
          <h5>${escapeHTML(activity.name)}</h5>
          <p class="activity-card__location">📍 ${escapeHTML(activity.location)}</p>
          ${activity.description ? `<p class="activity-card__desc">${escapeHTML(activity.description)}</p>` : ""}
          <div class="activity-card__actions">
            <button type="button" data-edit-activity="${day.id}:${activity.id}">Edit</button>
            <button type="button" class="is-danger" data-remove-activity="${day.id}:${activity.id}">Remove</button>
          </div>
        </div>`;
}

function renderActivityForm(dayId, existing) {
    const isEdit = !!existing;
    const cats = ACTIVITY_CATEGORIES.map(c =>
        `<option value="${c}" ${existing && existing.category === c ? "selected" : ""}>${c}</option>`).join("");
    return `
        <form class="activity-form" data-day-form="${dayId}" data-activity-id="${isEdit ? existing.id : ""}" novalidate>
          <div class="activity-form__grid">
            <div>
              <label for="af-name-${dayId}">Activity name</label>
              <input type="text" id="af-name-${dayId}" data-field="name" value="${isEdit ? escapeAttr(existing.name) : ""}" placeholder="e.g. Visit museum">
            </div>
            <div>
              <label for="af-location-${dayId}">Location</label>
              <input type="text" id="af-location-${dayId}" data-field="location" value="${isEdit ? escapeAttr(existing.location) : ""}" placeholder="e.g. City center">
            </div>
            <div>
              <label for="af-time-${dayId}">Time</label>
              <input type="time" id="af-time-${dayId}" data-field="time" value="${isEdit ? existing.time : ""}">
            </div>
            <div>
              <label for="af-category-${dayId}">Category</label>
              <select id="af-category-${dayId}" data-field="category">${cats}</select>
            </div>
          </div>
          <div>
            <label for="af-desc-${dayId}">Short description</label>
            <textarea id="af-desc-${dayId}" data-field="description" placeholder="A line about this activity">${isEdit ? escapeHTML(existing.description || "") : ""}</textarea>
          </div>
          <span class="field-error" data-form-error></span>
          <div class="activity-form__actions">
            <button type="submit" class="btn btn--dark btn--sm">${isEdit ? "Save changes" : "Add activity"}</button>
            <button type="button" class="btn btn--outline btn--sm" data-cancel-activity="${dayId}">Cancel</button>
          </div>
        </form>`;
}

function renderDayCard(day, index) {
    const activitiesHTML = day.activities.length
        ? day.activities.map(a => renderActivityCard(day, a)).join("")
        : `<div class="activity-list__empty">No activities yet — add the first one for this day.</div>`;

    const isFormOpenHere = openActivityForm && openActivityForm.dayId === day.id;
    let formHTML = "";
    if (isFormOpenHere) {
        const existing = openActivityForm.activityId
            ? day.activities.find(a => a.id === openActivityForm.activityId)
            : null;
        formHTML = renderActivityForm(day.id, existing);
    }

    return `
        <div class="day-card" data-day-id="${day.id}">
          <div class="day-card__head">
            <div>
              <h4>Day ${index + 1}</h4>
              ${day.date ? `<span class="day-card__date">${formatDateShort(day.date)}</span>` : ""}
            </div>
            <div class="day-card__actions">
              <button type="button" class="icon-text-btn" data-add-activity="${day.id}">+ Activity</button>
              <button type="button" class="icon-text-btn icon-text-btn--danger" data-remove-day="${day.id}">Remove day</button>
            </div>
          </div>
          <div class="activity-list">${activitiesHTML}</div>
          ${formHTML}
        </div>`;
}

function renderTripOverview() {
    const trip = currentTrip;
    const status = tripStatus(trip);
    const dayCount = trip.days.length;
    document.getElementById("tripOverview").innerHTML = `
        <div class="trip-overview__card">
          <div class="trip-overview__top">
            <div>
              <h3>${escapeHTML(trip.name)}</h3>
              <span>${escapeHTML(trip.destination)}</span>
            </div>
            <span class="status-pill ${status.cls}">${status.label}</span>
          </div>
          <div class="trip-overview__row">
            <div><span>Destination</span><b>${escapeHTML(trip.destination)}</b></div>
            <div><span>Travel dates</span><b>${formatDateDisplay(trip.startDate)} – ${formatDateDisplay(trip.endDate)}</b></div>
            <div><span>Number of days</span><b>${dayCount}</b></div>
            <div><span>Travelers</span><b>${trip.travelers}</b></div>
          </div>
          ${trip.description ? `<p class="trip-overview__desc">${escapeHTML(trip.description)}</p>` : ""}
        </div>`;
}

function renderItinerary() {
    document.getElementById("itineraryList").innerHTML =
        currentTrip.days.map((d, i) => renderDayCard(d, i)).join("");
}

function renderTripSummary() {
    const trip = currentTrip;
    const dayCount = trip.days.length;
    const actCount = totalActivities(trip);

    const itineraryHTML = trip.days.map((day, i) => {
        const list = day.activities.length
            ? `<ul>${day.activities.map(a => `<li>${a.time ? escapeHTML(a.time) + " — " : ""}${escapeHTML(a.name)} (${escapeHTML(a.category)})</li>`).join("")}</ul>`
            : `<div class="trip-summary__day-empty">No activities planned yet.</div>`;
        return `
          <div class="trip-summary__day">
            <div class="trip-summary__day-title">Day ${i + 1}${day.date ? " — " + formatDateShort(day.date) : ""}</div>
            ${list}
          </div>`;
    }).join("");

    document.getElementById("tripSummary").innerHTML = `
        <div class="trip-summary__grid">
          <div><b>${escapeHTML(trip.destination)}</b><span>Destination</span></div>
          <div><b>${dayCount}</b><span>Total days</span></div>
          <div><b>${actCount}</b><span>Total activities</span></div>
          <div><b>${trip.travelers}</b><span>Travelers</span></div>
        </div>
        <div class="trip-summary__itinerary">
          <h4>Complete itinerary</h4>
          ${itineraryHTML}
        </div>`;
}

function renderPlanner() {
    populateDestinationList();
    const formCard = document.getElementById("plannerFormCard");
    const workspace = document.getElementById("plannerWorkspace");
    const newBtn = document.getElementById("plannerNewBtn");

    if (!currentTrip) {
        formCard.hidden = false;
        workspace.hidden = true;
        newBtn.hidden = true;
        return;
    }

    formCard.hidden = true;
    workspace.hidden = false;
    newBtn.hidden = false;
    renderTripOverview();
    renderItinerary();
    renderTripSummary();
}

/* ---- Escaping helpers (planner writes user text into innerHTML) ---- */
function escapeHTML(str) {
    return String(str ?? "").replace(/[&<>"']/g, ch => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
}
function escapeAttr(str) { return escapeHTML(str); }

/* ---- Event wiring: trip creation ---- */
document.getElementById("tripForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById("tripName").value.trim(),
        destination: document.getElementById("tripDestination").value.trim(),
        startDate: document.getElementById("tripStart").value,
        endDate: document.getElementById("tripEnd").value,
        travelers: parseInt(document.getElementById("tripTravelers").value, 10),
        description: document.getElementById("tripDescription").value.trim()
    };
    if (!validateTripForm(data)) return;
    createTrip(data);
    openActivityForm = null;
    renderPlanner();
    toast(`${data.name} created — start building your itinerary`);
    document.getElementById("tripOverview").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("plannerNewBtn").addEventListener("click", () => {
    if (!confirm("Start a new trip? This will replace your current planned trip.")) return;
    currentTrip = null;
    openActivityForm = null;
    store.set("meridian_trip", null);
    document.getElementById("tripForm").reset();
    document.getElementById("tripTravelers").value = 1;
    renderPlanner();
    document.getElementById("plannerFormCard").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("addDayBtn").addEventListener("click", addItineraryDay);

/* ---- Event wiring: itinerary (delegated, content is dynamic) ---- */
document.getElementById("itineraryList").addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-activity]");
    if (addBtn) {
        openActivityForm = { dayId: addBtn.getAttribute("data-add-activity"), activityId: null };
        renderPlanner();
        return;
    }

    const editBtn = e.target.closest("[data-edit-activity]");
    if (editBtn) {
        const [dayId, activityId] = editBtn.getAttribute("data-edit-activity").split(":");
        openActivityForm = { dayId, activityId };
        renderPlanner();
        return;
    }

    const cancelBtn = e.target.closest("[data-cancel-activity]");
    if (cancelBtn) {
        openActivityForm = null;
        renderPlanner();
        return;
    }

    const removeActBtn = e.target.closest("[data-remove-activity]");
    if (removeActBtn) {
        const [dayId, activityId] = removeActBtn.getAttribute("data-remove-activity").split(":");
        removeActivity(dayId, activityId);
        return;
    }

    const removeDayBtn = e.target.closest("[data-remove-day]");
    if (removeDayBtn) {
        if (confirm("Remove this day and all of its activities?")) {
            removeItineraryDay(removeDayBtn.getAttribute("data-remove-day"));
        }
        return;
    }
});

document.getElementById("itineraryList").addEventListener("submit", (e) => {
    const form = e.target.closest("[data-day-form]");
    if (!form) return;
    e.preventDefault();

    const dayId = form.getAttribute("data-day-form");
    const activityId = form.getAttribute("data-activity-id");
    const data = {
        name: form.querySelector('[data-field="name"]').value.trim(),
        location: form.querySelector('[data-field="location"]').value.trim(),
        time: form.querySelector('[data-field="time"]').value,
        category: form.querySelector('[data-field="category"]').value,
        description: form.querySelector('[data-field="description"]').value.trim()
    };

    const errs = validateActivityForm(data);
    const errEl = form.querySelector("[data-form-error]");
    if (Object.keys(errs).length) {
        errEl.textContent = Object.values(errs)[0];
        return;
    }
    errEl.textContent = "";

    if (activityId) {
        updateActivity(dayId, activityId, data);
        toast("Activity updated");
    } else {
        addActivity(dayId, data);
        toast("Activity added");
    }
    openActivityForm = null;
    renderPlanner();
});

/* ==========================================================
   TRAVEL SERVICES & BOOKING — added for Task 5
   Self-contained module: data, rendering, validation, and
   event wiring for browsing services and submitting a
   booking request (form -> summary -> confirmation).
   Nothing above this block was modified.
   ========================================================== */

const SERVICE_CATEGORIES = ["All", "Hotels", "Transportation", "Tour Packages", "Activities", "Restaurants"];

const SERVICES = [
    { id: "hz-serena", category: "Hotels", name: "Hunza Serena Inn", location: "Karimabad, Hunza", rating: 4.7, price: 140, image: "images/booking1.jpg", palette: ["#3a5d7a", "#eaf1f7"], description: "A mountainside inn with orchard gardens and full-glass views of Rakaposhi, a short walk from Karimabad's old bazaar.", facilities: ["Free Wi-Fi", "Mountain-view rooms", "In-house restaurant", "Airport pickup on request"], terms: "Check-in 2 PM, check-out 11 AM. Free cancellation up to 48 hours before arrival." },
    { id: "hz-eagle", category: "Hotels", name: "Eagle's Nest Hotel", location: "Duikar, Hunza", rating: 4.5, price: 95, image: "images/booking2.jpg", palette: ["#2f6b52", "#e6f0ea"], description: "Perched on the highest viewpoint in the valley, famous for sunrise views over Hunza and Nagar.", facilities: ["Sunrise viewpoint terrace", "Free breakfast", "Heated rooms", "Parking"], terms: "Check-in 1 PM, check-out 11 AM. Non-refundable within 24 hours of arrival." },
    { id: "tr-jeep", category: "Transportation", name: "Private Jeep Transfer", location: "Islamabad → Hunza", rating: 4.6, price: 180, image: "images/booking3.webp", palette: ["#39586b", "#e6edf1"], description: "A private 4x4 transfer along the Karakoram Highway with stops at major viewpoints, driven by a licensed local driver.", facilities: ["Air-conditioned 4x4", "English-speaking driver", "Fuel & tolls included", "Photo-stop flexibility"], terms: "Price is per vehicle (up to 4 people). Reschedule free of charge up to 24 hours before pickup." },
    { id: "tr-shared", category: "Transportation", name: "Shared Coaster Van", location: "Gilgit ⇄ Hunza", rating: 4.2, price: 25, image: "images/booking4.jpg", palette: ["#4d6b3f", "#eef2e8"], description: "A budget-friendly shared van running daily between Gilgit and Hunza, ideal for solo travelers.", facilities: ["Daily departures", "Luggage space", "Rest stop included"], terms: "Seats are first-come, first-served. No refunds within 12 hours of departure." },
    { id: "tp-valley", category: "Tour Packages", name: "3-Day Hunza Valley Tour", location: "Hunza & Nagar", rating: 4.8, price: 260, image: "images/booking5.jpg", palette: ["#a8562e", "#f7e6da"], description: "A guided 3-day tour covering Attabad Lake, Khunjerab Pass, Baltit Fort, and the Nagar viewpoints, with a local guide throughout.", facilities: ["Licensed local guide", "2 nights' hotel included", "All entry tickets", "Daily breakfast"], terms: "Minimum 2 travelers. 50% deposit required to confirm the booking." },
    { id: "tp-cultural", category: "Tour Packages", name: "Karimabad Heritage Walk", location: "Karimabad, Hunza", rating: 4.5, price: 40, image: "images/booking6.jpg", palette: ["#c17a2e", "#f6ece1"], description: "A half-day walking tour through Baltit Fort, Altit Fort, and the old town lanes with a heritage-focused local guide.", facilities: ["Small group (max 8)", "Fort entry tickets included", "Local guide"], terms: "Runs rain or shine. Free cancellation up to 6 hours before start time." },
    { id: "ac-lake", category: "Activities", name: "Attabad Lake Boating", location: "Attabad Lake, Hunza", rating: 4.6, price: 20, image: "images/booking7.jpg", palette: ["#2e8fa3", "#e4f3f5"], description: "A guided boat ride across the turquoise waters of Attabad Lake, with stops for photos and lakeside chai.", facilities: ["Life jackets provided", "30–40 minute ride", "Group or private boats"], terms: "Weather dependent — full refund if the activity is cancelled for safety reasons." },
    { id: "ac-trek", category: "Activities", name: "Passu Glacier Trek", location: "Passu, Hunza", rating: 4.7, price: 55, image: "images/booking8.jpg", palette: ["#c99a3e", "#f8f0dd"], description: "A guided half-day trek to the base of Passu Glacier and the Hussaini suspension bridge.", facilities: ["Trekking guide", "Basic first-aid kit", "Trekking poles available"], terms: "Moderate fitness level required. Please arrive 15 minutes before the start time." },
    { id: "rs-baltit", category: "Restaurants", name: "Baltit View Restaurant", location: "Karimabad, Hunza", rating: 4.4, price: 15, image: "images/booking9.jpg", palette: ["#b0455e", "#f6e6ea"], description: "Local Hunza cuisine served on a terrace facing Baltit Fort and Rakaposhi — a favorite sunset dinner spot.", facilities: ["Terrace seating", "Local & continental menu", "Vegetarian options"], terms: "Reservations recommended for terrace seating during peak season (Jun–Sep)." },
    { id: "rs-serai", category: "Restaurants", name: "Old Silk Route Café", location: "Aliabad, Hunza", rating: 4.3, price: 10, image: "images/booking10.jpeg", palette: ["#3b6ea5", "#e9f0f5"], description: "A cozy café along the old Silk Route trade path, known for apricot cake and traditional Hunza tea.", facilities: ["Cozy indoor seating", "Wi-Fi", "Vegetarian & vegan options"], terms: "Walk-ins welcome. Groups of 6+ please call ahead." },
    { id: "hz-riverview", category: "Hotels", name: "Riverview Boutique Hotel", location: "Aliabad, Hunza", rating: 4.6, price: 110, image: "images/booking11.jpg", palette: ["#4a6f8a", "#e8f0f5"], description: "A boutique hotel set beside the Hunza River, blending traditional stonework with modern rooms and a quiet riverside garden.", facilities: ["Free Wi-Fi", "River-facing rooms", "On-site garden café", "24-hour front desk"], terms: "Check-in 2 PM, check-out 11 AM. Free cancellation up to 48 hours before arrival." },
    { id: "rs-mountain", category: "Restaurants", name: "Mountain Harvest Restaurant", location: "Karimabad, Hunza", rating: 4.5, price: 18, image: "images/booking12.jpg", palette: ["#3f7d4a", "#e7f1e6"], description: "A farm-to-table restaurant serving organic Hunza produce and traditional dishes, with panoramic seating overlooking the valley.", facilities: ["Panoramic valley seating", "Organic, locally-sourced menu", "Vegetarian & gluten-free options"], terms: "Reservations recommended for dinner seating during peak season (Jun–Sep)." },
];

/* Category -> Font Awesome icon, used on pills and card badges */
const SERVICE_CATEGORY_ICONS = {
    "All": "fa-solid fa-layer-group",
    "Hotels": "fa-solid fa-hotel",
    "Transportation": "fa-solid fa-van-shuttle",
    "Tour Packages": "fa-solid fa-map-location-dot",
    "Activities": "fa-solid fa-person-hiking",
    "Restaurants": "fa-solid fa-utensils"
};

let svcActiveCategory = "All";
let svcSearchTerm = "";
let svcBookingService = null;

/* Bookings the user has completed, persisted the same way as the
   Trip Planner's currentTrip (via the store helper / localStorage). */
let myBookings = store.get("meridian_bookings", []);
function persistBookings() { store.set("meridian_bookings", myBookings); }

function svcById(id) { return SERVICES.find(s => s.id === id); }

function svcFiltered() {
    const term = svcSearchTerm.trim().toLowerCase();
    return SERVICES.filter(s => {
        const matchesCategory = svcActiveCategory === "All" || s.category === svcActiveCategory;
        const matchesSearch = !term || s.name.toLowerCase().includes(term) || s.location.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
    });
}

function svcVisual(s) {
    return placeholderSvg(`svc-${s.id}`, s.palette, 0);
}

/* Renders a service's real photo (images/services/<id>.jpg) with the
   generated placeholder art as an automatic fallback if the file is
   missing — same convention as destPhoto() above for destinations.
   Drop images into an "images/services" folder next to this HTML
   file, named to match each service's id (see SERVICES above), e.g.
   images/services/hz-serena.jpg. */
function svcPhoto(s) {
    return `<img src="${s.image}" alt="${escapeHTML(s.name)}, ${escapeHTML(s.location)}" loading="lazy" class="dest-photo"
        data-svc-photo-id="${s.id}" onerror="handleSvcImgError(this)">`;
}

function handleSvcImgError(imgEl) {
    const s = svcById(imgEl.dataset.svcPhotoId);
    if (!s) return;
    const wrap = document.createElement("div");
    wrap.innerHTML = svcVisual(s);
    const svgEl = wrap.firstElementChild;
    svgEl.classList.add("dest-photo");
    imgEl.replaceWith(svgEl);
}

function renderServiceCategoryPills() {
    document.getElementById("svcCategoryPills").innerHTML = SERVICE_CATEGORIES.map(c =>
        `<button class="trail-pill ${c === svcActiveCategory ? "is-active" : ""}" data-svc-cat="${c}">
           <i class="${SERVICE_CATEGORY_ICONS[c]}" aria-hidden="true"></i> ${c}
         </button>`
    ).join("");
}

function serviceCard(s) {
    return `
        <article class="rcard" data-svc-id="${s.id}" tabindex="0" role="group" aria-label="${escapeHTML(s.name)}">
          <div class="rcard__img">
            ${svcPhoto(s)}
            <span class="rcard__badge"><i class="${SERVICE_CATEGORY_ICONS[s.category]}" aria-hidden="true"></i> ${s.category}</span>
          </div>
          <div class="rcard__body">
            <div class="rcard__name">${escapeHTML(s.name)}</div>
            <div class="rcard__loc"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${escapeHTML(s.location)}</div>
            <div class="rcard__meta">
              <span class="rcard__rating"><i class="fa-solid fa-star" aria-hidden="true"></i> ${s.rating}</span>
              <span class="rcard__price">$${s.price}</span>
            </div>
          </div>
          <div class="svc-card__actions">
            <button type="button" class="btn btn--outline btn--sm" data-svc-view="${s.id}"><i class="fa-regular fa-circle-info" aria-hidden="true"></i> View details</button>
            <button type="button" class="btn btn--dark btn--sm" data-svc-book="${s.id}"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book now</button>
          </div>
        </article>`;
}

function renderServiceGrid() {
    const list = svcFiltered();
    document.getElementById("svcGrid").innerHTML = list.length
        ? list.map(serviceCard).join("")
        : `<div class="empty-state">No services match your search — try a different category or keyword.</div>`;
    const countEl = document.getElementById("svcResultCount");
    countEl.textContent = svcSearchTerm.trim() ? `${list.length} result${list.length === 1 ? "" : "s"}` : "";
}

/* ---- Service details modal ---- */
function openServiceDetail(id) {
    const s = svcById(id);
    if (!s) return;
    document.getElementById("svcDetailImg").innerHTML = svcPhoto(s);
    document.getElementById("svcDetailCategory").innerHTML = `<i class="${SERVICE_CATEGORY_ICONS[s.category]}" aria-hidden="true"></i> ${s.category}`;
    document.getElementById("svcDetailName").textContent = s.name;
    document.getElementById("svcDetailLoc").innerHTML = `<i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${escapeHTML(s.location)}`;
    document.getElementById("svcDetailRating").textContent = s.rating;
    document.getElementById("svcDetailPrice").textContent = `$${s.price}`;
    document.getElementById("svcDetailDesc").textContent = s.description;
    document.getElementById("svcDetailFacilities").innerHTML = s.facilities.map(f => `<li>${escapeHTML(f)}</li>`).join("");
    document.getElementById("svcDetailTerms").textContent = s.terms;
    document.getElementById("svcDetailBookBtn").setAttribute("data-svc-book", s.id);
    document.getElementById("svcDetailModal").hidden = false;
}

function closeServiceDetail() {
    document.getElementById("svcDetailModal").hidden = true;
}

/* ---- Booking modal: form -> summary -> confirmation ---- */
function showBookingStep(step) {
    document.getElementById("bookingStepForm").hidden = step !== "form";
    document.getElementById("bookingStepSummary").hidden = step !== "summary";
    document.getElementById("bookingStepConfirm").hidden = step !== "confirm";
}

function updateBookingLiveTotal() {
    if (!svcBookingService) return;
    const people = Math.max(1, parseInt(document.getElementById("bkPeople").value, 10) || 1);
    const total = svcBookingService.price * people;
    document.getElementById("bookingLiveTotal").textContent =
        `${people} × $${svcBookingService.price} = $${total} total`;
}

/* Fills the "Selected service" dropdown with every service, grouped
   by category, so the user can change their mind on which service
   they're booking without leaving the form. */
function populateBkServiceSelect(selectedId) {
    const select = document.getElementById("bkService");
    select.innerHTML = SERVICE_CATEGORIES.filter(c => c !== "All").map(cat => `
        <optgroup label="${cat}">
            ${SERVICES.filter(s => s.category === cat)
            .map(s => `<option value="${s.id}" ${s.id === selectedId ? "selected" : ""}>${escapeHTML(s.name)} — $${s.price}/person</option>`)
            .join("")}
        </optgroup>`).join("");
}

function updateSelectedServiceMeta() {
    if (!svcBookingService) return;
    document.getElementById("bookingServiceMeta").textContent =
        `${svcBookingService.location} · $${svcBookingService.price} / person`;
}

function onBkServiceChange() {
    const id = document.getElementById("bkService").value;
    const s = svcById(id);
    if (!s) return;
    svcBookingService = s;
    updateSelectedServiceMeta();
    updateBookingLiveTotal();
}

function openBookingModal(id) {
    const s = svcById(id);
    if (!s) return;
    svcBookingService = s;
    document.getElementById("bookingForm").reset();
    populateBkServiceSelect(s.id);
    document.getElementById("bkPeople").value = 1;
    ["bkServiceError", "bkFullNameError", "bkEmailError", "bkPhoneError", "bkDateError", "bkPeopleError"].forEach(id => {
        document.getElementById(id).textContent = "";
    });
    updateSelectedServiceMeta();
    updateBookingLiveTotal();
    showBookingStep("form");
    document.getElementById("bookingModal").hidden = false;
}

function closeBookingModal() {
    document.getElementById("bookingModal").hidden = true;
    svcBookingService = null;
}

function validateBookingForm(data) {
    const errs = {};
    if (!data.serviceId) errs.service = "Please choose a service.";
    if (!data.fullName) errs.fullName = "Please enter your full name.";
    if (!data.email) {
        errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errs.email = "Please enter a valid email address.";
    }
    if (!data.phone) errs.phone = "Please enter a phone number.";
    if (!data.date) errs.date = "Please choose a booking date.";
    if (!data.people || data.people < 1) errs.people = "Number of people must be at least 1.";
    return errs;
}

function generateBookingId() {
    const n = Math.floor(10000 + Math.random() * 90000);
    return `TRV-${n}`;
}

function renderBookingSummary(data, total, bookingId) {
    document.getElementById("bookingSummaryBody").innerHTML = `
        <div class="booking-summary__row"><span>Customer name</span><b>${escapeHTML(data.fullName)}</b></div>
        <div class="booking-summary__row"><span>Selected service</span><b>${escapeHTML(svcBookingService.name)}</b></div>
        <div class="booking-summary__row"><span>Date</span><b>${escapeHTML(data.date)}</b></div>
        <div class="booking-summary__row"><span>Number of people</span><b>${data.people}</b></div>
        <div class="booking-summary__row"><span>Price</span><b>$${svcBookingService.price} / person</b></div>
        <div class="booking-summary__row booking-summary__row--total"><span>Total amount</span><b>$${total}</b></div>
        <div class="booking-summary__row"><span>Booking status</span><b>Pending confirmation</b></div>`;
}

let svcPendingBooking = null;

/* ---------- Event wiring: Travel Services & Booking ---------- */
document.getElementById("svcCategoryPills").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-svc-cat]");
    if (!btn) return;
    svcActiveCategory = btn.getAttribute("data-svc-cat");
    renderServiceCategoryPills();
    renderServiceGrid();
});

document.getElementById("svcSearchInput").addEventListener("input", (e) => {
    svcSearchTerm = e.target.value;
    renderServiceGrid();
});

document.getElementById("svcGrid").addEventListener("click", (e) => {
    const viewBtn = e.target.closest("[data-svc-view]");
    if (viewBtn) { openServiceDetail(viewBtn.getAttribute("data-svc-view")); return; }
    const bookBtn = e.target.closest("[data-svc-book]");
    if (bookBtn) { openBookingModal(bookBtn.getAttribute("data-svc-book")); return; }
});

document.getElementById("svcDetailCloseBtn").addEventListener("click", closeServiceDetail);
document.getElementById("svcDetailCloseBtn2").addEventListener("click", closeServiceDetail);
document.getElementById("svcDetailBookBtn").addEventListener("click", (e) => {
    const id = e.currentTarget.getAttribute("data-svc-book");
    closeServiceDetail();
    openBookingModal(id);
});

document.getElementById("bkService").addEventListener("change", onBkServiceChange);
document.getElementById("bkPeople").addEventListener("input", updateBookingLiveTotal);

document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        serviceId: document.getElementById("bkService").value,
        fullName: document.getElementById("bkFullName").value.trim(),
        email: document.getElementById("bkEmail").value.trim(),
        phone: document.getElementById("bkPhone").value.trim(),
        date: document.getElementById("bkDateInput").value,
        people: parseInt(document.getElementById("bkPeople").value, 10) || 0,
        request: document.getElementById("bkRequest").value.trim()
    };
    const errs = validateBookingForm(data);
    ["service", "fullName", "email", "phone", "date", "people"].forEach(field => {
        document.getElementById(`bk${field.charAt(0).toUpperCase() + field.slice(1)}Error`).textContent = errs[field] || "";
    });
    if (Object.keys(errs).length) return;

    svcBookingService = svcById(data.serviceId);
    const total = svcBookingService.price * data.people;
    svcPendingBooking = { data, total };
    renderBookingSummary(data, total);
    showBookingStep("summary");
});

document.getElementById("bookingEditBtn").addEventListener("click", () => showBookingStep("form"));

document.getElementById("bookingConfirmBtn").addEventListener("click", () => {
    if (!svcPendingBooking) return;
    const bookingId = generateBookingId();
    document.getElementById("bookingIdOut").textContent = bookingId;

    myBookings.push({
        id: bookingId,
        serviceId: svcBookingService.id,
        serviceName: svcBookingService.name,
        category: svcBookingService.category,
        location: svcBookingService.location,
        date: svcPendingBooking.data.date,
        people: svcPendingBooking.data.people,
        price: svcBookingService.price,
        total: svcPendingBooking.total,
        status: "Pending confirmation"
    });
    persistBookings();
    renderMyBookings();

    showBookingStep("confirm");
    toast("Booking request submitted successfully");
});

document.getElementById("bookingCloseBtn").addEventListener("click", closeBookingModal);
document.getElementById("bookingDoneBtn").addEventListener("click", closeBookingModal);

document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!document.getElementById("bookingModal").hidden) closeBookingModal();
    if (!document.getElementById("svcDetailModal").hidden) closeServiceDetail();
});

/* Renders the persistent "Your bookings" summary at the bottom of
   the Travel Services & Booking section — same stats-grid + list
   visual pattern as the Trip Planner's renderTripSummary(). */
function renderMyBookings() {
    const container = document.getElementById("svcBookingsSummary");
    if (!myBookings.length) {
        container.innerHTML = `<div class="trip-summary__day-empty">No bookings yet — book a hotel, restaurant, tour package, activity, or transport above to see your summary here.</div>`;
        return;
    }

    const totalAmount = myBookings.reduce((sum, b) => sum + b.total, 0);
    const categoryCount = new Set(myBookings.map(b => b.category)).size;

    const entriesHTML = myBookings.slice().reverse().map(b => `
        <div class="trip-summary__day">
          <div class="trip-summary__day-title svc-booking-entry">
            <span>${escapeHTML(b.serviceName)} · ${escapeHTML(b.category)}</span>
            <span class="svc-booking-entry__id">${escapeHTML(b.id)}</span>
          </div>
          <ul>
            <li>${escapeHTML(b.location)}</li>
            <li>${b.date ? escapeHTML(b.date) + " · " : ""}${b.people} traveler${b.people === 1 ? "" : "s"}</li>
            <li>$${b.price} / person · Total $${b.total}</li>
          </ul>
          <span class="svc-booking-status">${escapeHTML(b.status)}</span>
        </div>`).join("");

    container.innerHTML = `
        <div class="trip-summary__grid">
          <div><b>${myBookings.length}</b><span>Total bookings</span></div>
          <div><b>$${totalAmount}</b><span>Total amount</span></div>
          <div><b>${categoryCount}</b><span>Categories booked</span></div>
        </div>
        <div class="trip-summary__itinerary">
          <h4>Booking history</h4>
          ${entriesHTML}
        </div>`;
}

function renderServices() {
    renderServiceCategoryPills();
    renderServiceGrid();
    renderMyBookings();
}

/* ==========================================================
   REVIEWS, RATINGS & TRAVEL COMMUNITY — added for Task 6 (Week 6)
   Self-contained module: seed data, rendering (summary,
   filters, cards), interactive star picker, review submission
   with validation, and the helpful-vote toggle.
   Nothing above this block was modified.
   ========================================================== */

const REVIEW_FILTERS = [
    { label: "All Reviews", value: 0 },
    { label: "5 Stars", value: 5 },
    { label: "4 Stars", value: 4 },
    { label: "3 Stars", value: 3 },
    { label: "2 Stars", value: 2 },
    { label: "1 Star", value: 1 },
];

const REVIEW_RATING_LABELS = { 1: "Poor", 2: "Needs improvement", 3: "Average", 4: "Good", 5: "Excellent" };

/* Rotating palette for initials avatars on reviews that don't have an
   uploaded photo — purely cosmetic, cycles by list position. */
const REVIEW_AVATAR_COLORS = ["#3b6ea5", "#c17a2e", "#7a4fa0", "#2f8f6d", "#b0455e", "#2e8fa3", "#39586b"];

function seedReviews() {
    return [
        { id: uid("rev"), name: "Amara Chen", target: "Santorini, Greece", rating: 5, text: "Amazing experience! We watched the sunset from Oia and it genuinely lived up to the hype. Caldera-view room was worth every penny.", date: "2026-06-14", image: "", helpful: 24 },
        { id: uid("rev"), name: "Hassan Riaz", target: "Hunza Serena Inn", rating: 5, text: "The hotel was clean and the staff were incredibly helpful — they arranged a last-minute Rakaposhi viewpoint trip for us without any fuss.", date: "2026-07-02", image: "", helpful: 18 },
        { id: uid("rev"), name: "Priya Nair", target: "Machu Picchu, Peru", rating: 4, text: "Breathtaking views, but the trek up was tougher than I expected. Go with a guide and start early to beat the crowds.", date: "2026-05-21", image: "", helpful: 15 },
        { id: uid("rev"), name: "Daniyal Sheikh", target: "Attabad Lake Boating", rating: 4, text: "Good half hour on the water, calm and scenic. Would have liked a bit more time at the far shore for photos.", date: "2026-07-18", image: "", helpful: 9 },
        { id: uid("rev"), name: "Fatima Zahra", target: "Karimabad Heritage Walk", rating: 3, text: "Decent walk through Baltit Fort but felt a little rushed with a bigger group. Guide was knowledgeable though.", date: "2026-06-29", image: "", helpful: 6 },
        { id: uid("rev"), name: "Omar Farooq", target: "Reykjavik, Iceland", rating: 2, text: "The Blue Lagoon was great, but our northern lights tour got cancelled twice for weather with only a partial refund.", date: "2026-03-09", image: "", helpful: 11 },
        { id: uid("rev"), name: "Lena Novak", target: "Shared Coaster Van", rating: 1, text: "Van left 40 minutes late and was overbooked, three of us had to stand for part of the ride. Wouldn't book again.", date: "2026-07-05", image: "", helpful: 4 },
    ];
}

let reviews = store.get("meridian_reviews", null);
if (!Array.isArray(reviews)) {
    reviews = seedReviews();
    store.set("meridian_reviews", reviews);
}

/* Ids of reviews this browser has marked as helpful — guest-level,
   like the rest of this module, so voting works without an account. */
let reviewVotes = store.get("meridian_review_votes", []);

function persistReviews() { store.set("meridian_reviews", reviews); }
function persistReviewVotes() { store.set("meridian_review_votes", reviewVotes); }

let activeReviewFilter = 0; // 0 = All Reviews
let pickedRating = 0;
let hoverRating = 0;

function reviewAvatarColor(index) {
    return REVIEW_AVATAR_COLORS[index % REVIEW_AVATAR_COLORS.length];
}

/* ---- Average rating summary ---- */
function reviewSummaryStats() {
    const total = reviews.length;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    reviews.forEach(r => {
        counts[r.rating] = (counts[r.rating] || 0) + 1;
        sum += r.rating;
    });
    const avg = total ? sum / total : 0;
    return { total, counts, avg };
}

function starIconsHTML(rating, size) {
    const rounded = Math.round(rating);
    let out = "";
    for (let i = 1; i <= 5; i++) {
        out += `<i class="${i <= rounded ? "fa-solid" : "fa-regular"} fa-star" aria-hidden="true"></i>`;
    }
    return out;
}

function renderReviewSummary() {
    const { total, counts, avg } = reviewSummaryStats();
    const avgDisplay = total ? avg.toFixed(1) : "0.0";

    const barsHTML = [5, 4, 3, 2, 1].map(star => {
        const count = counts[star] || 0;
        const pct = total ? Math.round((count / total) * 100) : 0;
        return `
          <div class="rev-summary__bar-row">
            <span>${star} star</span>
            <span class="rev-summary__bar-track"><span class="rev-summary__bar-fill" style="width:${pct}%"></span></span>
            <span>${count}</span>
          </div>`;
    }).join("");

    document.getElementById("revSummary").innerHTML = `
        <div class="rev-summary__score">
          <b>${avgDisplay} <span style="font-size:1.2rem;font-weight:700;">/ 5</span></b>
          <div class="rev-summary__stars">${starIconsHTML(avg)}</div>
          <span class="rev-summary__count">${total} review${total === 1 ? "" : "s"}</span>
        </div>
        <div class="rev-summary__bars">${barsHTML}</div>`;
}

/* ---- Filter pills ---- */
function renderReviewFilterPills() {
    document.getElementById("revFilterPills").innerHTML = REVIEW_FILTERS.map(f =>
        `<button class="trail-pill ${f.value === activeReviewFilter ? "is-active" : ""}" data-rev-filter="${f.value}">${f.label}</button>`
    ).join("");
}

/* ---- Review cards ---- */
function reviewCard(r, index) {
    const voted = reviewVotes.includes(r.id);
    const avatarStyle = r.image
        ? `background-image:url("${r.image}")`
        : `background-color:${reviewAvatarColor(index)}`;
    const avatarInner = r.image ? "" : initials(r.name);
    const photoHTML = r.image
        ? `<div class="rev-card__photo"><img src="${r.image}" alt="Photo from ${escapeHTML(r.name)}'s review" loading="lazy"></div>`
        : "";

    return `
        <article class="rev-card" data-review-id="${r.id}">
          <div class="rev-card__top">
            <div class="rev-card__avatar" style="${avatarStyle}">${avatarInner}</div>
            <div class="rev-card__meta">
              <div>
                <div class="rev-card__name">${escapeHTML(r.name)}</div>
                <div class="rev-card__sub">${escapeHTML(r.target)} · ${formatDateShort(r.date)}</div>
              </div>
              <div class="rev-card__stars">${starIconsHTML(r.rating)}</div>
            </div>
          </div>
          <p class="rev-card__text">${escapeHTML(r.text)}</p>
          ${photoHTML}
          <div class="rev-card__bottom">
            <button type="button" class="rev-card__helpful ${voted ? "is-voted" : ""}" data-rev-helpful="${r.id}">
              👍 Helpful — ${r.helpful}
            </button>
          </div>
        </article>`;
}

function renderReviewList() {
    const filtered = activeReviewFilter === 0
        ? reviews
        : reviews.filter(r => r.rating === activeReviewFilter);

    const listEl = document.getElementById("revList");
    const emptyEl = document.getElementById("revListEmpty");

    listEl.innerHTML = filtered.map((r, i) => reviewCard(r, i)).join("");
    emptyEl.hidden = filtered.length > 0;
}

function renderReviews() {
    renderReviewSummary();
    renderReviewFilterPills();
    renderReviewList();
}

/* ---- Write-a-review form: target dropdown ---- */
function populateReviewTargets() {
    const select = document.getElementById("revTarget");
    if (!select) return;
    const placeholder = select.querySelector('option[value=""]');
    const destOptions = DESTINATIONS.map(d => `<option value="${escapeAttr(d.name + ", " + d.region)}">${escapeHTML(d.name)}, ${escapeHTML(d.region)}</option>`).join("");
    const svcOptions = SERVICES.map(s => `<option value="${escapeAttr(s.name + " — " + s.location)}">${escapeHTML(s.name)} — ${escapeHTML(s.location)}</option>`).join("");
    select.innerHTML =
        (placeholder ? placeholder.outerHTML : `<option value="" disabled selected>Choose a destination or service</option>`) +
        `<optgroup label="Destinations">${destOptions}</optgroup>` +
        `<optgroup label="Services & stays">${svcOptions}</optgroup>`;
}

/* ---- Interactive star picker ---- */
function renderStarPicker() {
    const picker = document.getElementById("revStarPicker");
    picker.innerHTML = [1, 2, 3, 4, 5].map(n =>
        `<button type="button" data-star="${n}" aria-label="${n} star${n === 1 ? "" : "s"}" aria-pressed="${n === pickedRating}">★</button>`
    ).join("");
    updateStarPickerVisual();
}

function updateStarPickerVisual() {
    const activeCount = hoverRating || pickedRating;
    document.querySelectorAll("#revStarPicker button").forEach(btn => {
        const n = Number(btn.getAttribute("data-star"));
        btn.classList.toggle("is-filled", n <= pickedRating && !hoverRating);
        btn.classList.toggle("is-hover", n <= hoverRating);
    });
    const label = document.getElementById("revStarPickerLabel");
    if (activeCount) {
        label.textContent = `${activeCount} — ${REVIEW_RATING_LABELS[activeCount]}`;
    } else {
        label.textContent = "Tap a star to rate";
    }
}

document.getElementById("revStarPicker").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-star]");
    if (!btn) return;
    pickedRating = Number(btn.getAttribute("data-star"));
    hoverRating = 0;
    updateStarPickerVisual();
    setFieldError("revRating", "");
});
document.getElementById("revStarPicker").addEventListener("mouseover", (e) => {
    const btn = e.target.closest("[data-star]");
    if (!btn) return;
    hoverRating = Number(btn.getAttribute("data-star"));
    updateStarPickerVisual();
});
document.getElementById("revStarPicker").addEventListener("mouseout", (e) => {
    if (!e.target.closest("[data-star]")) return;
    hoverRating = 0;
    updateStarPickerVisual();
});

/* ---- Validation ---- */
function validateReviewForm(data) {
    const errs = {};
    if (!data.name) errs.name = "Please enter your name.";
    if (!data.target) errs.target = "Please choose a destination or service.";
    if (!data.rating) errs.rating = "Please select a rating.";
    if (!data.text) errs.text = "Please write a few words about your experience.";
    return errs;
}

/* ---- Helpful vote toggle ---- */
function toggleReviewHelpful(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) return;
    if (reviewVotes.includes(id)) {
        reviewVotes = reviewVotes.filter(v => v !== id);
        review.helpful = Math.max(0, review.helpful - 1);
    } else {
        reviewVotes = [...reviewVotes, id];
        review.helpful += 1;
    }
    persistReviews();
    persistReviewVotes();
    renderReviewList();
}

document.getElementById("revList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rev-helpful]");
    if (!btn) return;
    toggleReviewHelpful(btn.getAttribute("data-rev-helpful"));
});

document.getElementById("revFilterPills").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rev-filter]");
    if (!btn) return;
    activeReviewFilter = Number(btn.getAttribute("data-rev-filter"));
    renderReviewFilterPills();
    renderReviewList();
});

/* ---- Submission ---- */
function resetReviewForm() {
    document.getElementById("reviewForm").reset();
    pickedRating = 0;
    hoverRating = 0;
    renderStarPicker();
    ["revNameError", "revTargetError", "revRatingError", "revTextError"].forEach(id => {
        document.getElementById(id).textContent = "";
    });
}

function submitReview(imageDataUrl) {
    const data = {
        name: document.getElementById("revName").value.trim(),
        target: document.getElementById("revTarget").value,
        rating: pickedRating,
        text: document.getElementById("revText").value.trim(),
    };
    const errs = validateReviewForm(data);
    setFieldError("revName", errs.name || "");
    setFieldError("revTarget", errs.target || "");
    setFieldError("revRating", errs.rating || "");
    setFieldError("revText", errs.text || "");
    if (Object.keys(errs).length) return;

    reviews = [{
        id: uid("rev"),
        name: data.name,
        target: data.target,
        rating: data.rating,
        text: data.text,
        date: toISODate(new Date()),
        image: imageDataUrl || "",
        helpful: 0
    }, ...reviews];
    persistReviews();

    activeReviewFilter = 0;
    resetReviewForm();
    renderReviews();
    toast("Thanks — your review has been posted");
    document.getElementById("revSummary").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("revImageInput");
    const file = fileInput.files && fileInput.files[0];
    if (file) {
        if (!file.type.startsWith("image/")) { toast("Please choose an image file"); return; }
        const reader = new FileReader();
        reader.onload = () => submitReview(reader.result);
        reader.readAsDataURL(file);
    } else {
        submitReview("");
    }
});

/* Prefill the reviewer name from the logged-in profile, if any, without
   forcing a login — the review form itself stays open to everyone. */
function prefillReviewerName() {
    const nameInput = document.getElementById("revName");
    if (isLoggedIn() && !nameInput.value && profile.name && profile.name !== DEFAULT_PROFILE.name) {
        nameInput.value = profile.name;
    }
}

/* ==========================================================
   SMART TRAVEL RECOMMENDATIONS & ASSISTANT (Task 7 / Week 7)
   Rule-based only — no real AI/ML. Scores existing DESTINATIONS
   against the traveler's stated preferences and explains why
   each pick was suggested. Reuses byId(), destPhoto(),
   escapeHTML(), toast() and openDetail() from earlier weeks.
   ========================================================== */

/* Maps a Task-7 "travel type" onto the trail categories that
   already exist on DESTINATIONS, plus a light budget lean —
   Luxury/Budget aren't trail-based, so they lean on price. */
const SMART_TYPE_TRAILS = {
    Adventure: ["Adventure", "Safari"],
    Relaxation: ["Beach"],
    Family: ["Beach", "Culture"],
    Cultural: ["Culture"],
    Luxury: ["Beach", "Mountain", "Safari"],
    Budget: ["Culture", "Adventure"]
};

function smartBudgetTier(price) {
    if (price < 800) return "Low";
    if (price <= 1400) return "Medium";
    return "High";
}

/* Duration select values are day counts (2/5/9); labels double as
   the friendly phrasing reused in reasons and assistant answers. */
const SMART_DURATION_LABELS = {
    2: "a weekend (2–3 days)",
    5: "a short trip (4–6 days)",
    9: "an extended trip (7+ days)"
};

/* Listed prices assume a ~5-day package; scale by the chosen
   duration so a weekend and a 9-day trip don't cost the same. */
function smartEstimatedCost(price, travelers, duration) {
    const days = duration || 5;
    return Math.round(price * travelers * (days / 5));
}

/* Scores one destination against the submitted preferences.
   Returns { score, reasons[] } — higher score = better match. */
function scoreSmartDestination(d, prefs) {
    let score = d.rating; // small baseline so highly rated places edge out ties
    const reasons = [];
    const tier = smartBudgetTier(d.price);

    if (prefs.budget) {
        if (prefs.budget === tier) { score += 3; reasons.push(`fits your ${prefs.budget.toLowerCase()} budget`); }
        else if (prefs.budget === "Luxury" || prefs.budget === "High") { /* n/a, guarded above */ }
    }

    if (prefs.travelType) {
        const trails = SMART_TYPE_TRAILS[prefs.travelType] || [];
        if (trails.includes(d.trail)) { score += 3; reasons.push(`matches your ${prefs.travelType.toLowerCase()} travel style`); }
        if (prefs.travelType === "Luxury" && tier === "High") { score += 2; reasons.push("a higher-end pick"); }
        if (prefs.travelType === "Budget" && tier === "Low") { score += 2; reasons.push("budget-friendly pricing"); }
        if (prefs.travelType === "Family" && d.rating >= 4.6) { score += 1; reasons.push("consistently high traveler ratings"); }
    }

    if (prefs.environment && prefs.environment !== "Any") {
        if (d.trail === prefs.environment) { score += 3; reasons.push(`in your preferred ${prefs.environment.toLowerCase()} setting`); }
        else { score -= 2; }
    }

    if (prefs.duration) {
        // Longer trips suit richer/pricier destinations; short weekends favor closer/cheaper picks.
        if (prefs.duration <= 3 && tier !== "High") { score += 0.5; reasons.push("easy to fit into a weekend"); }
        if (prefs.duration >= 7 && tier !== "Low") { score += 0.5; reasons.push("worth the extra days for a longer stay"); }
    }

    score += d.rating * 0.5;
    return { score, reasons };
}

function getSmartRecommendations(prefs) {
    let scored = DESTINATIONS.map(d => ({ d, ...scoreSmartDestination(d, prefs) }));
    scored.sort((a, b) => b.score - a.score);
    let top = scored.filter(s => s.reasons.length > 0).slice(0, 6);
    // Fallback so the traveler never sees an empty result: if nothing scored
    // a genuine match (e.g. a very narrow combination), surface the
    // highest-rated destinations instead rather than showing nothing.
    if (top.length < 3) {
        top = scored.slice(0, Math.max(3, top.length)).map(s =>
            s.reasons.length ? s : { ...s, reasons: ["one of our top-rated destinations overall"] });
    }
    return top;
}

function smartReasonText(reasons) {
    if (!reasons.length) return "A solid all-round pick.";
    const unique = [...new Set(reasons)];
    return "Recommended because: " + unique.slice(0, 3).join(", ") + ".";
}

function smartRecCard({ d, reasons }, travelers, duration) {
    const cost = smartEstimatedCost(d.price, travelers, duration);
    const durationLabel = SMART_DURATION_LABELS[duration] || "a standard 5-day trip";
    return `
        <article class="rcard" data-id="${d.id}">
          <div class="rcard__img">${destPhoto(d)}<span class="rcard__badge">${d.trail}</span></div>
          <div class="rcard__body">
            <div class="rcard__name">${d.name}</div>
            <div class="rcard__loc">${d.region}</div>
            <div class="rcard__meta">
              <span class="rcard__rating"><span class="star">★</span> ${d.rating}</span>
              <span class="rcard__price">$${d.price}/person</span>
            </div>
            <div class="smart-rec-cost">Estimated cost for ${travelers} traveler${travelers === 1 ? "" : "s"} over
              ${durationLabel}: <b>$${cost.toLocaleString()}</b></div>
            <div class="smart-rec-reason">${escapeHTML(smartReasonText(reasons))}</div>
            <div class="smart-rec-card__actions">
              <button class="btn btn--outline btn--sm" data-smart-view="${d.id}">View details</button>
            </div>
          </div>
        </article>`;
}

function setSmartFieldError(id, message) {
    const el = document.getElementById(id + "Error");
    if (el) el.textContent = message || "";
}

function readSmartPrefs() {
    return {
        budget: document.getElementById("smartBudget").value,
        travelType: document.getElementById("smartTravelType").value,
        duration: Number(document.getElementById("smartDuration").value) || 0,
        environment: document.getElementById("smartEnvironment").value,
        travelers: Number(document.getElementById("smartTravelers").value) || 1
    };
}

function validateSmartPrefs(prefs) {
    const errs = {};
    if (!prefs.budget) errs.smartBudget = "Choose a budget to continue.";
    if (!prefs.travelType) errs.smartTravelType = "Choose a travel type to continue.";
    if (!prefs.duration) errs.smartDuration = "Choose a trip duration.";
    if (!prefs.travelers || prefs.travelers < 1 || prefs.travelers > 20) errs.smartTravelers = "Enter 1–20 travelers.";
    return errs;
}

let lastSmartPrefs = null;

function renderSmartRecommendations(prefs, results) {
    const grid = document.getElementById("smartRecGrid");
    const empty = document.getElementById("smartRecEmpty");
    if (!results || !results.length) {
        grid.innerHTML = "";
        empty.hidden = false;
        empty.textContent = "No close matches yet — try widening your preferred environment or budget.";
        empty.className = "smart-rec-error";
        return;
    }
    empty.hidden = true;
    grid.innerHTML = results.map(r => smartRecCard(r, prefs.travelers, prefs.duration)).join("");
}

document.getElementById("smartPrefForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const prefs = readSmartPrefs();
    const errs = validateSmartPrefs(prefs);
    ["smartBudget", "smartTravelType", "smartDuration", "smartTravelers"].forEach(id => setSmartFieldError(id, errs[id] || ""));
    if (Object.keys(errs).length) return;

    lastSmartPrefs = prefs;
    const results = getSmartRecommendations(prefs);
    renderSmartRecommendations(prefs, results);
    toast(`Found ${results.length} recommendation${results.length === 1 ? "" : "s"} for you`);
});

document.getElementById("smartResetBtn").addEventListener("click", () => {
    document.getElementById("smartPrefForm").reset();
    document.getElementById("smartEnvironment").value = "Any";
    ["smartBudget", "smartTravelType", "smartDuration", "smartTravelers"].forEach(id => setSmartFieldError(id, ""));
    lastSmartPrefs = null;
    document.getElementById("smartRecGrid").innerHTML = "";
    const empty = document.getElementById("smartRecEmpty");
    empty.hidden = false;
    empty.className = "smart-rec-empty";
    empty.textContent = "Fill in your preferences above and tap \"Get recommendations\" to see destinations picked for you.";
});

document.getElementById("smartRecGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-smart-view]");
    if (!btn) return;
    openDetail(btn.dataset.smartView);
});

/* ---------- Travel assistant: predefined Q&A ---------- */
const ASSISTANT_QUESTIONS = [
    {
        id: "where",
        label: "Where should I travel?",
        answer() {
            const prefs = lastSmartPrefs;
            const list = prefs ? getSmartRecommendations(prefs) : DESTINATIONS.slice().sort((a, b) => b.rating - a.rating).slice(0, 3).map(d => ({ d, reasons: [] }));
            const names = list.slice(0, 3).map(r => r.d.name).join(", ");
            return prefs
                ? `Based on your preferences, try ${names}.`
                : `Some highly-rated places to start with: ${names}. Fill in the preference form above for picks tailored to you.`;
        }
    },
    {
        id: "what-to-do",
        label: "What can I do there?",
        answer() {
            const prefs = lastSmartPrefs;
            const top = prefs ? getSmartRecommendations(prefs)[0] : DESTINATIONS.slice().sort((a, b) => b.rating - a.rating)[0];
            const d = top.d || top;
            return `In ${d.name}, popular things to do include ${d.highlights.join("; ")}.`;
        }
    },
    {
        id: "low-budget",
        label: "What should I choose for a low budget?",
        answer() {
            const cheap = DESTINATIONS.slice().filter(d => smartBudgetTier(d.price) === "Low").sort((a, b) => b.rating - a.rating).slice(0, 3);
            if (!cheap.length) return "Nothing currently falls under $800/person — try the Medium budget tier instead.";
            return `For a low budget, consider ${cheap.map(d => `${d.name} (from $${d.price}/person)`).join(", ")}.`;
        }
    },
    {
        id: "families",
        label: "Which destination is suitable for families?",
        answer() {
            const family = DESTINATIONS.slice().filter(d => (SMART_TYPE_TRAILS.Family || []).includes(d.trail) && d.rating >= 4.5)
                .sort((a, b) => b.rating - a.rating).slice(0, 3);
            return `Family-friendly picks with strong ratings: ${family.map(d => d.name).join(", ")}.`;
        }
    },
    {
        id: "weekend",
        label: "What's good for a quick weekend trip?",
        answer() {
            const weekend = DESTINATIONS.slice().filter(d => smartBudgetTier(d.price) !== "High")
                .sort((a, b) => b.rating - a.rating).slice(0, 3);
            return `For a 2–3 day weekend, ${weekend.map(d => d.name).join(", ")} are easy to fit in without a big budget.`;
        }
    },
    {
        id: "luxury",
        label: "Show me luxury options",
        answer() {
            const luxury = DESTINATIONS.slice().filter(d => smartBudgetTier(d.price) === "High")
                .sort((a, b) => b.rating - a.rating).slice(0, 3);
            return `Top luxury-tier picks: ${luxury.map(d => `${d.name} (from $${d.price}/person)`).join(", ")}.`;
        }
    },
    {
        id: "estimate",
        label: "What's my estimated trip cost?",
        answer() {
            const prefs = lastSmartPrefs;
            if (!prefs) return "Fill in the travel preference form above first, then ask me again and I'll estimate it.";
            const top = getSmartRecommendations(prefs)[0];
            const cost = smartEstimatedCost(top.d.price, prefs.travelers, prefs.duration);
            const durationLabel = SMART_DURATION_LABELS[prefs.duration] || "your selected trip length";
            return `For ${top.d.name} over ${durationLabel} with ${prefs.travelers} traveler${prefs.travelers === 1 ? "" : "s"}, expect around $${cost.toLocaleString()}.`;
        }
    }
];

function renderAssistantQuestions() {
    document.getElementById("assistantQuestions").innerHTML = ASSISTANT_QUESTIONS.map(q =>
        `<button class="trail-pill" data-assistant-q="${q.id}">${escapeHTML(q.label)}</button>`
    ).join("");
}

function askAssistant(id) {
    const q = ASSISTANT_QUESTIONS.find(x => x.id === id);
    if (!q) return;
    const log = document.getElementById("assistantLog");
    const empty = document.getElementById("assistantEmpty");
    if (empty) empty.remove();
    const answerText = q.answer();
    log.insertAdjacentHTML("beforeend", `
        <div class="assistant-bubble assistant-bubble--q">${escapeHTML(q.label)}</div>
        <div class="assistant-bubble assistant-bubble--a">${escapeHTML(answerText)}</div>`);
    log.scrollTop = log.scrollHeight;
}

document.getElementById("assistantQuestions").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-assistant-q]");
    if (!btn) return;
    askAssistant(btn.dataset.assistantQ);
});

/* ---------- Init ---------- */
if (currentEmail && users[currentEmail]) {
    currentUser = users[currentEmail];
    loadUserIntoState(currentUser);
} else {
    currentEmail = null;
    store.set("meridian_session", null);
}
renderAuthUI();
renderStaticVisuals();
renderAll();
renderServices();
populateReviewTargets();
renderStarPicker();
renderReviews();
prefillReviewerName();
renderAssistantQuestions();

/* Platform optimization (Task 7): every existing form's error text
   (trip planner, reviews, bookings, smart preferences) is announced
   to screen readers as soon as it's set, instead of silently. */
document.querySelectorAll(".field-error").forEach(el => el.setAttribute("aria-live", "polite"));