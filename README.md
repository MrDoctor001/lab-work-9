# NEXUS Workspace — Coworking Website for IT Specialists

A responsive, accessible, commercial-grade landing page for **NEXUS Workspace**, a modern 24/7 IT coworking hub in Almaty, Kazakhstan.

Developed for **University Lab Work #9** in the course **Information and Communication Technologies (`ICT6001`)** at **International Information Technology University (IITU)**, Almaty, Kazakhstan.

---

## 1. Project Overview

**NEXUS Workspace** is designed for software engineers, web developers, UI/UX designers, IT freelancers, startup teams, and technical students. The interface follows a **Premium Tech + Minimalism + Modern SaaS + Subtle Cyberpunk** aesthetic with complete support for both **Light Mode** and **Dark Mode**.

### Key Features
- **Responsive Mobile-First Architecture:** Built from the ground up for `320px`, `390px` (Mobile Figma target), `768px` (Tablet), and `1024px–1440px+` (Desktop Figma target) without horizontal scrolling.
- **Light & Dark Theme Switcher:** Instant switching via CSS Custom Properties (`--background`, `--surface`, `--text`, `--accent`, etc.), persisted in `localStorage` with automatic `prefers-color-scheme` detection on first visit.
- **Interactive Navigation & Burger Menu:** Sticky glassmorphism header on desktop and accessible slide-down burger menu (`aria-expanded`, `Escape` key support, outside-click close) on mobile devices.
- **Dynamic Tariff Selection:** Clicking **Choose Plan** on any tariff card (`Hot Desk`, `Fixed Desk`, `Team Office`) smoothly scrolls to the Booking Form and automatically pre-selects the corresponding plan and default zone.
- **Client-Side Booking Form Validation:** Uses HTML5 validation attributes (`required`, `type="email"`, `type="tel"`, `pattern`), CSS `:valid` / `:invalid` / `:focus-visible` states, and Vanilla JavaScript validation including checking that **End Time is later than Start Time**.
- **Test Day Modal & Event / Legal Modals:** Accessible dialog windows for requesting a trial day (`Test Day`), exploring event agendas (`Learn More`), and reading `Resident Rules`, `Privacy Policy`, and `Terms of Service`.
- **WCAG Accessibility:** Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), skip-to-content link, keyboard focus trapping in modals, high text contrast, and `prefers-reduced-motion` support.

---

## 2. Technologies Used

Strictly built with native web standards (zero external frameworks or build tools required):
- **HTML5** (Semantic markup, native form validation attributes, ARIA attributes)
- **CSS3** (CSS Custom Properties, CSS Grid, Flexbox, fluid `clamp()` typography, Mobile-First media queries)
- **Vanilla JavaScript (ES6+)** (DOM manipulation, `localStorage`, custom validation, accessible modal management)

---

## 3. Project Structure

```text
nexus-workspace/
├── index.html          # Main semantic HTML5 structure
├── style.css           # Mobile-first stylesheet & Light/Dark theme tokens
├── script.js           # Interactive logic (theme, menu, modals, validation)
├── DESIGN_SYSTEM.md    # Complete design tokens, typography, and grid specs
├── FIGMA_GUIDE.md      # Step-by-step guide to reproducing the site in Figma
├── README.md           # Project documentation, launch & GitHub Pages guide
└── images/             # Local WebP photos and SVG icons
    ├── hero-workspace.webp
    ├── event-networking.webp
    ├── event-ai-workshop.webp
    ├── event-pitch-night.webp
    ├── logo.svg
    ├── favicon.svg
    ├── icon-wifi.svg
    ├── icon-access.svg
    ├── icon-meeting.svg
    ├── icon-coffee.svg
    ├── icon-gaming.svg
    ├── icon-print.svg
    ├── icon-security.svg
    └── icon-community.svg
```

---

## 4. How to Run Locally

Because the project uses pure HTML, CSS, and Vanilla JS with relative paths, no `npm install` or build step is needed:

### Option A: Open Directly in Browser
1. Open the `nexus-workspace` folder on your computer.
2. Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.

### Option B: Run via VS Code Live Server (Recommended)
1. Open the `nexus-workspace` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey) if not already installed.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500/index.html`.

---

## 5. Meaningful Git Commit Workflow (Minimum 3 Commits)

When initializing your repository for Lab Work #9, execute the following commands inside the `nexus-workspace/` directory to create a clean, realistic commit history reflecting the stages of development:

```bash
# Initialize repository
git init
git branch -M main

# Commit 1: Semantic HTML5 structure and local graphical assets
git add index.html images/
git commit -m "feat: create semantic HTML structure and local SVG/WebP assets"

# Commit 2: Mobile-first responsive CSS layout and Light/Dark design system
git add style.css DESIGN_SYSTEM.md FIGMA_GUIDE.md
git commit -m "feat: implement responsive CSS layout and light/dark theme tokens"

# Commit 3: Interactive booking validation, modals, theme persistence, and docs
git add script.js README.md
git commit -m "feat: add interactive booking validation, modals, and theme switching"
```

---

## 6. How to Publish on GitHub Pages

1. Create a new public repository on GitHub (for example, `nexus-workspace`).
2. Link your local repository and push your commits:
   ```bash
   git remote add origin https://github.com/<your-username>/nexus-workspace.git
   git push -u origin main
   ```
3. On GitHub, open your repository and go to **Settings** &rarr; **Pages** (in the left sidebar).
4. Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
5. Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
6. Wait 1–2 minutes and refresh the page. Your live website URL will appear at:
   `https://<your-username>.github.io/nexus-workspace/`

---

## 7. Academic Disclaimer

All tariff prices, Almaty address coordinates, contact phone numbers, and community events on this website are demonstration content created specifically for **IITU ICT6001 Lab Work #9**. Submitting forms displays a client-side confirmation message without transmitting personal data to any external server.
