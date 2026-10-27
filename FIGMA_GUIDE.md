# Step-by-Step Guide to Reproducing NEXUS Workspace in Figma (`FIGMA_GUIDE.md`)

This guide explains how to accurately recreate the **4 mandatory Figma frames** (`Desktop Light 1440px`, `Desktop Dark 1440px`, `Mobile Light 390px`, and `Mobile Dark 390px`) so that your Figma design matches your live website 1:1.

---

## Step 1: Set Up Variables & Styles in Figma

### 1.1 Create Local Color Variables (Collection: `Theme`)
Open Figma -> **Local Variables** -> Create Collection `Theme` with two modes: **`Light`** and **`Dark`**.

| Variable Name | `Light` Mode Value | `Dark` Mode Value |
| :--- | :--- | :--- |
| `background` | `#F8FAFC` | `#09090F` |
| `background-alt` | `#F1F5F9` | `#0E0E17` |
| `surface` | `#FFFFFF` | `#151521` |
| `surface-elevated` | `#FFFFFF` | `#1C1C2B` |
| `text` | `#0F172A` | `#F8FAFC` |
| `text-secondary` | `#475569` | `#A1A1AA` |
| `accent` | `#6366F1` | `#818CF8` |
| `accent-secondary` | `#06B6D4` | `#22D3EE` |
| `border` | `#E2E8F0` | `#272735` |

> **Tip:** By binding your components to these variables, you only need to build **Desktop Light (`1440px`)** and **Mobile Light (`390px`)** once! Then duplicate both frames and switch their Frame Variable Mode from `Light` to `Dark` to instantly generate **Desktop Dark (`1440px`)** and **Mobile Dark (`390px`)**.

### 1.2 Create Text Styles
Install **Manrope** and **Inter** (available by default in Figma):
- `Desktop / H1 Hero`: Manrope, ExtraBold (`800`), `60px`, Line-height `110%`, Letter-spacing `-3%`
- `Mobile / H1 Hero`: Manrope, ExtraBold (`800`), `34px`, Line-height `110%`, Letter-spacing `-3%`
- `Desktop / H2 Section`: Manrope, ExtraBold (`800`), `44px`, Line-height `118%`, Letter-spacing `-2.5%`
- `Mobile / H2 Section`: Manrope, ExtraBold (`800`), `28px`, Line-height `118%`, Letter-spacing `-2.5%`
- `Card Title / H3`: Manrope, ExtraBold (`800`), `22px`, Line-height `125%`
- `Amenity Title / H3`: Manrope, Bold (`700`), `18px`, Line-height `130%`
- `Body / Large`: Inter, Regular (`400`), `18px`, Line-height `165%`
- `Body / Regular`: Inter, Regular (`400`), `15px`, Line-height `160%`
- `Badge / Uppercase`: Inter, Bold (`700`), `12px`, Line-height `120%`, Letter-spacing `12%`

---

## Step 2: Configure the 4 Root Frames & Grids

1. **Frame 1 — `Desktop - Light (1440px)`**:
   - Width: `1440px`, Height: Auto Layout (Vertical, `gap: 0`, Fill: `background`)
   - Layout Grid: **12 Columns**, Margin `120px`, Gutter `24px`, Color `#6366F1` at `8%` opacity.
2. **Frame 2 — `Desktop - Dark (1440px)`**:
   - Duplicate Frame 1 after building all sections and switch Layer Mode to `Dark`.
3. **Frame 3 — `Mobile - Light (390px)`**:
   - Width: `390px`, Height: Auto Layout (Vertical, `gap: 0`, Fill: `background`)
   - Layout Grid: **4 Columns**, Margin `20px`, Gutter `16px`, Color `#6366F1` at `8%` opacity.
4. **Frame 4 — `Mobile - Dark (390px)`**:
   - Duplicate Frame 3 after building all sections and switch Layer Mode to `Dark`.

---

## Step 3: Section-by-Section Reproduction Guide

### Section 1: Header (`72px` Height)
- **Desktop (`1440px`):**
  - Auto Layout Horizontal, Width `1440px`, Height `72px`, Padding Left/Right `120px`, Align `Space Between`, Center vertically.
  - Bottom Stroke: `1px` (`border`), Background Blur: `14px`.
  - **Left:** Import `images/logo.svg` (`36×36px`) + Text `NEXUS Workspace` (`Workspace` colored with `accent`).
  - **Center:** Auto Layout Horizontal (`gap: 24px`) with links: `Tariffs`, `Location`, `Amenities`, `Events`.
  - **Right:** Theme Switcher pill (`Light / Dark`) + Primary Button `Test Day` (`height: 40px`, `radius: 12px`).
- **Mobile (`390px`):**
  - Width `390px`, Height `72px`, Padding Left/Right `20px`, Align `Space Between`.
  - **Left:** Logo (`36×36px`) + `NEXUS Workspace`.
  - **Right:** Burger Menu Button (`44×44px`, `radius: 12px`, `1px` border `border`, 3 horizontal `20×2px` lines).

---

### Section 2: Hero Section
- **Background Layer:** Place `images/hero-workspace.webp` at `16–25%` opacity with a vertical gradient overlay (`background` at top/bottom) plus two blurred ellipses (`blur: 90px`) in `#6366F1` and `#06B6D4`.
- **Desktop (`1440px`):**
  - Container width `1200px` (`Padding: 96px 120px`), Horizontal Auto Layout (`gap: 48px`).
  - **Left Column (`7 columns` / `~676px`):**
    1. Eyebrow pill: Green/Cyan dot + `THE FUTURE OF WORK STARTS HERE` (`radius: 999px`).
    2. Heading `H1`: `Space for Productive Work 24/7` (`24/7` filled with Indigo-to-Cyan gradient).
    3. Description paragraph (`max-width: 600px`).
    4. Buttons Row (Horizontal, `gap: 14px`): `Explore Locations` (Primary, `height: 52px`) + `View Tariffs` (Secondary, `height: 52px`).
    5. Stats Bar (`surface` fill, `border` stroke, `radius: 16px`, `padding: 22px 28px`): `24/7 Access` | `High-Speed Internet` | `100+ Workspaces` separated by `1px` vertical dividers.
  - **Right Column (`5 columns` / `~476px`):**
    - Showcase Card (`radius: 20px`, `border` stroke, `surface` fill): Top image `images/hero-workspace.webp` (`height: 360px`, `object-fit: cover`) + Bottom caption bar (`Almaty Tech Hub • Zone A` & `Ultrawide 4K Displays • Wi-Fi 6E`).
- **Mobile (`390px`):**
  - Vertical Auto Layout (`Padding: 48px 20px`, `gap: 32px`).
  - Buttons stack vertically (`width: 350px` / `Fill Container`, `height: 52px` each).
  - Stats Bar stacks its 3 items vertically.
  - Showcase Image Card sits below the stats bar (`width: 350px`).

---

### Section 3: Tariffs (`Find Your Perfect Workspace`)
- **Section Header:** Centered tag `PRICING PLANS`, Title `Find Your Perfect Workspace`, Subtitle `Flexible plans designed for individuals, professionals, and growing teams.`
- **3 Cards:**
  1. **Hot Desk:** `₸4,000 / day` — 6 bullet items with cyan checkmarks + Secondary Button `Choose Plan`.
  2. **Fixed Desk (Featured):** `2px` stroke in `accent`, top-right pill badge `MOST POPULAR` (Indigo-to-Cyan gradient), `₸65,000 / month` — 6 bullet items + Primary Button `Choose Plan`. On Desktop, offset `Y: -8px`.
  3. **Team Office:** `₸180,000 / month` — 6 bullet items + Secondary Button `Choose Plan`.
- **Desktop Layout:** 3 cards in a horizontal row (`width: 381px` each, `gap: 28px`).
- **Mobile Layout:** 3 cards stacked vertically (`width: 350px` each, `gap: 24px`).

---

### Section 4: Amenities (`Everything You Need to Do Your Best Work`)
- **Section Background:** `background-alt` with `1px` top and bottom borders.
- **8 Amenity Cards:**
  - Drag the SVG icons from `images/icon-*.svg` (`icon-wifi.svg`, `icon-access.svg`, `icon-meeting.svg`, `icon-coffee.svg`, `icon-gaming.svg`, `icon-print.svg`, `icon-security.svg`, `icon-community.svg`) into a `48×48px` rounded square (`radius: 12px`).
  - Add Title (`18px Bold`) and 2-line description (`14.5px Regular`, `text-secondary`).
- **Desktop Layout:** 2 rows × 4 columns (`width: 282px` per card, `gap: 24px`).
- **Mobile Layout:** 8 cards stacked vertically (`width: 350px` per card, `gap: 20px`).

---

### Section 5: Location (`Your Workspace in the Heart of Almaty`)
- **Desktop Layout (`1200px` container, `gap: 32px`):**
  - **Left (`7 columns` / `680px`):** Map Card (`radius: 20px`) with a screenshot or map tile of Central Almaty (Abay Ave & Manas St area) + bottom bar `Open Map in New Tab ↗`.
  - **Right (`5 columns` / `488px`):** Location Info Card (`radius: 20px`, `padding: 36px`) with badge `Demonstration Location Example`, title `NEXUS Workspace — Almaty Central`, 3 icon+text rows (Sample Address, Operating Hours, Contact Info), and full-width Primary Button `Get Directions`.
- **Mobile Layout (`350px` width):**
  - Map Card on top (`height: 300px`), Location Info Card directly underneath.

---

### Section 6: Events (`Connect. Learn. Build.`)
- **Section Background:** `background-alt`.
- **3 Event Cards (`radius: 20px`, `surface` fill, `1px` border):**
  1. `Tech Networking Night` (`images/event-networking.webp`)
  2. `AI & Machine Learning Workshop` (`images/event-ai-workshop.webp`)
  3. `Startup Pitch Evening` (`images/event-pitch-night.webp`)
  - Each card has a `16:9` top image with a dark glass date badge at bottom-left, category label, `H3` title, description, and full-width Secondary Button `Learn More`.
- **Desktop Layout:** 3 cards horizontally (`381px` each, `gap: 28px`).
- **Mobile Layout:** 3 cards stacked vertically (`350px` each, `gap: 24px`).

---

### Section 7: Booking Form (`Book Your Perfect Workspace`)
- **Container Card:** Centered card (`max-width: 832px` on Desktop, `350px` on Mobile), `surface` fill, `radius: 20px`, `padding: 48px` (Desktop) / `24px` (Mobile).
- **Form Fields:**
  - Desktop: 2-column grid (`gap: 20px`) for:
    1. `Full Name` | `Email Address`
    2. `Contact Phone` | `Zone Selection`
    3. `Workspace Plan` | `Reservation Date`
    4. `Start Time` | `End Time`
    5. `Additional Message` (spans full width across both columns)
  - Mobile: All fields stack in a single vertical column (`width: 100%`).
  - Bottom CTA: Full-width Primary Button `Submit Reservation` (`height: 52px`).

---

### Section 8: Footer
- **Desktop (`1440px`):** 4 columns (`Brand + Theme Switcher`, `Navigation`, `Information`, `Contact`) + bottom copyright bar (`© 2026 NEXUS Workspace. All rights reserved.`).
- **Mobile (`390px`):** Single vertical column with clear spacing (`gap: 32px`) + centered copyright bar at bottom.
