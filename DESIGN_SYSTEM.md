# NEXUS Workspace — Design System Specification (`DESIGN_SYSTEM.md`)

**Project:** Coworking Website for IT Specialists (`NEXUS Workspace`)  
**Course:** Information and Communication Technologies (`ICT6001`) — Lab Work #9  
**University:** International Information Technology University (IITU), Almaty, Kazakhstan  
**Visual Direction:** Premium Tech + Minimalism + Modern SaaS + Subtle Cyberpunk  

---

## 1. Color Palette & CSS Custom Properties

All colors are implemented as CSS Custom Properties on `:root` / `[data-theme="light"]` and `[data-theme="dark"]` in [`style.css`](file:///C:/Users/sarba/.gemini/antigravity/scratch/nexus-workspace/style.css).

### 1.1 Light Theme (`[data-theme="light"]`)

| Token Name | CSS Variable | Hex / Value | Figma Style Name | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Background Primary** | `--background` | `#F8FAFC` | `Light / BG / Primary` | Main page background |
| **Background Alt** | `--background-alt` | `#F1F5F9` | `Light / BG / Secondary` | Alternating sections (`Amenities`, `Events`), subtle inputs |
| **Surface / Card** | `--surface` | `#FFFFFF` | `Light / Surface / Card` | Cards, modals, navigation drawer, footer |
| **Surface Glass** | `--surface-glass` | `rgba(248, 250, 252, 0.85)` | `Light / Surface / Glass` | Sticky header with `backdrop-filter: blur(14px)` |
| **Text Primary** | `--text` | `#0F172A` | `Light / Text / Primary` | Headings, primary body labels, prices |
| **Text Secondary** | `--text-secondary` | `#475569` | `Light / Text / Secondary` | Descriptions, subtitles, navigation links |
| **Text Muted** | `--text-muted` | `#64748B` | `Light / Text / Muted` | Input placeholders, fine print |
| **Accent Primary** | `--accent` | `#6366F1` | `Light / Accent / Indigo` | Primary CTA buttons, active states, featured border |
| **Accent Secondary** | `--accent-secondary` | `#06B6D4` | `Light / Accent / Cyan` | Badges, check icons, gradient end, focus ring |
| **Border** | `--border` | `#E2E8F0` | `Light / Border / Default` | Card outlines, dividers, form inputs |

### 1.2 Dark Theme (`[data-theme="dark"]` — Subtle Cyberpunk Atmosphere)

| Token Name | CSS Variable | Hex / Value | Figma Style Name | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Background Primary** | `--background` | `#09090F` | `Dark / BG / Primary` | Main page deep-space background |
| **Background Alt** | `--background-alt` | `#0E0E17` | `Dark / BG / Secondary` | Alternating sections (`Amenities`, `Events`), form controls |
| **Surface / Card** | `--surface` | `#151521` | `Dark / Surface / Card` | Cards, modals, footer background |
| **Surface Elevated** | `--surface-elevated` | `#1C1C2B` | `Dark / Surface / Elevated` | Featured tariff card top gradient & map bar |
| **Surface Glass** | `--surface-glass` | `rgba(9, 9, 15, 0.82)` | `Dark / Surface / Glass` | Sticky header with `backdrop-filter: blur(14px)` |
| **Text Primary** | `--text` | `#F8FAFC` | `Dark / Text / Primary` | Crisp high-contrast headings & values |
| **Text Secondary** | `--text-secondary` | `#A1A1AA` | `Dark / Text / Secondary` | Body copy, subtitles, secondary links |
| **Text Muted** | `--text-muted` | `#71717A` | `Dark / Text / Muted` | Input placeholders |
| **Accent Primary** | `--accent` | `#818CF8` | `Dark / Accent / Indigo Neon` | Highlights, active icons, featured card border |
| **Accent Secondary** | `--accent-secondary` | `#22D3EE` | `Dark / Accent / Cyan Neon` | Cyberpunk glow accents, tags, checkmarks |
| **Border** | `--border` | `#272735` | `Dark / Border / Default` | Subtle technical card & input borders |

### 1.3 Brand Gradients & Semantic Status Colors

- **Primary CTA Gradient:** `linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)`
- **Brand Text & Badge Gradient:** `linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)`
- **Success State (`--success`):** `#10B981` (Light) / `#34D399` (Dark)
- **Danger / Invalid State (`--danger`):** `#EF4444` (Light) / `#F87171` (Dark)

---

## 2. Typography System

- **Display / Headings Font (`--font-display`):** `Manrope` (Weights: `700 Bold`, `800 ExtraBold`)
- **Body / UI Font (`--font-sans`):** `Inter` (Weights: `400 Regular`, `500 Medium`, `600 SemiBold`, `700 Bold`)

### Type Scale (Fluid `clamp()` & Figma Exact Sizes)

| Element / Role | CSS Fluid Rule | Mobile (`390px`) | Desktop (`1440px`) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`H1`)** | `clamp(2.15rem, 6vw, 3.75rem)` | `34px` (`2.15rem`) | `60px` (`3.75rem`) | `800` | `1.10` (`110%`) | `-0.03em` (`-3%`) |
| **Section Title (`H2`)** | `clamp(1.75rem, 4vw, 2.75rem)` | `28px` (`1.75rem`) | `44px` (`2.75rem`) | `800` | `1.18` (`118%`) | `-0.025em` (`-2.5%`) |
| **Tariff Price** | `clamp(1.85rem, 3.5vw, 2.35rem)` | `30px` (`1.85rem`) | `38px` (`2.35rem`) | `800` | `1.15` (`115%`) | `-0.02em` (`-2%`) |
| **Card Title (`H3` Large)** | `1.35rem` – `1.4rem` | `22px` | `22px` | `800` | `1.25` (`125%`) | `-0.01em` |
| **Amenity / Event Title (`H3`)** | `1.125rem` – `1.225rem` | `18px` – `20px` | `18px` – `20px` | `700–800` | `1.30` (`130%`) | `0` |
| **Hero Subtitle** | `clamp(1rem, 2vw, 1.175rem)` | `16px` | `19px` | `400` | `1.68` (`168%`) | `0` |
| **Section Subtitle** | `clamp(0.95rem, 1.8vw, 1.125rem)` | `15px` | `18px` | `400` | `1.65` (`165%`) | `0` |
| **Body Default** | `0.95rem` | `15px` | `15px` | `400` | `1.60` (`160%`) | `0` |
| **Section Tag / Badge** | `0.75rem` | `12px` | `12px` | `700` | `1.20` (`120%`) | `+0.12em` (`+12%`) |

---

## 3. Spacing, Border Radius & Shadows

### 3.1 Spacing Scale (8pt Base Grid)
- `4px` (`0.25rem`) — Tight inline gap
- `8px` (`0.5rem`) — Icon-to-label gap, button internal gap
- `12px` (`0.75rem`) — Feature list item vertical spacing
- `16px` (`1rem`) — Mobile grid gap, standard form control spacing
- `20px` (`1.25rem`) — Mobile horizontal container padding (`390px` frame)
- `24px` (`1.5rem`) — Card padding (mobile/tablet), grid gap
- `28px` (`1.75rem`) — Desktop 3-column grid gap
- `36px` (`2.25rem`) — Desktop card internal padding
- `48px` (`3rem`) — Hero column gap, booking card desktop padding
- `56px` to `96px` (`clamp(3.5rem, 7vw, 6rem)`) — Vertical section padding

### 3.2 Border Radius Tokens (Squircle-Inspired)
- `--radius-sm`: `8px` (`0.5rem`) — Segmented theme buttons
- `--radius-md`: `12px` (`0.75rem`) — All buttons, form inputs, icon boxes
- `--radius-lg`: `16px` (`1rem`) — Amenity cards, Hero stats bar
- `--radius-xl`: `20px` (`1.25rem`) — Tariff cards, Event cards, Location cards, Booking container, Modals
- `--radius-pill`: `9999px` — Section tags, "MOST POPULAR" badge, Eyebrow badge

---

## 4. Component Specifications

### 4.1 Buttons (`.btn`)
- **Primary Button (`.btn-primary`):**
  - Fill: Linear Gradient `135deg` (`#6366F1` to `#4F46E5`)
  - Text: `#FFFFFF`, `600 SemiBold`
  - Shadow: `0 4px 14px rgba(99, 102, 241, 0.35)`
  - Hover: Lifts `translateY(-2px)`, deeper gradient `#4F46E5` -> `#4338CA`
- **Secondary Button (`.btn-secondary`):**
  - Fill: `var(--surface)`
  - Border: `1px solid var(--border)`
  - Text: `var(--text)`, `600 SemiBold`
  - Hover: Border changes to `var(--accent)`, text to `var(--accent)`, lifts `translateY(-2px)`
- **Sizes:**
  - Small (`.btn-sm`): Height `40px` (`2.5rem`), Padding `10px 18px`, Font `14px`
  - Default (`.btn`): Height `46px` (`2.875rem`), Padding `13px 22px`, Font `15px`
  - Large (`.btn-lg`): Height `52px` (`3.25rem`), Padding `15px 28px`, Font `16px`

### 4.2 Cards
- **Tariff Card (`.tariff-card`):**
  - Radius: `20px` (`1.25rem`)
  - Padding: `24px` (Mobile) / `36px` (Desktop)
  - Border: `1px solid var(--border)` (Standard) / `2px solid var(--accent)` (Featured `Fixed Desk` card)
- **Amenity Card (`.amenity-card`):**
  - Radius: `16px` (`1rem`), Padding `24px`
  - Icon Container: `48px × 48px`, Radius `12px`, Gradient tint fill (`--glow-primary` to `--glow-secondary`)
- **Event Card (`.event-card`):**
  - Radius: `20px` (`1.25rem`), overflow hidden
  - Top Thumbnail: `16:9` aspect ratio (`images/event-*.webp`) with bottom-left glass date pill
  - Body Padding: `24px`, vertical flex layout

---

## 5. Responsive Breakpoints & Figma Layout Grids

### 5.1 Breakpoints in CSS
1. **Small Mobile:** `320px – 389px` (Fluid single-column, compact header)
2. **Mandatory Mobile Target:** `390px` (Base Mobile-First styles)
3. **Tablet:** `@media (min-width: 768px)` (2-column grids for Amenities, Events, Booking Form, Footer)
4. **Mandatory Desktop Target:** `@media (min-width: 1024px)` up to `1440px+` (Full horizontal navigation, 12-column aligned grids)

### 5.2 Figma Frame & Grid Settings

#### Desktop Frame (`1440px` Width — Light & Dark Variants)
- **Frame Width:** `1440px`
- **Container Max-Width:** `1200px` (centered)
- **Layout Grid:**
  - Type: `Columns`
  - Count: `12`
  - Margin: `120px` (Left & Right)
  - Gutter: `24px` (or `28px` for 3-up cards)
  - Column Width: `~78px`
- **Component Column Spans on 12-Column Grid:**
  - Header: Full `12 columns` (`1200px`)
  - Hero Content (Left): `7 columns` | Hero Showcase Card (Right): `5 columns`
  - Tariffs (3 Cards): `4 columns` each (`3 × 4 = 12`)
  - Amenities (4 Cards per row): `3 columns` each (`4 × 3 = 12`)
  - Location: Map (Left) `7 columns` | Info Card (Right) `5 columns`
  - Events (3 Cards): `4 columns` each (`3 × 4 = 12`)
  - Booking Card: Centered `8 columns` (`max-width: 832px` / `52rem`)
  - Footer: `12 columns` split (`4 + 2 + 3 + 3` columns)

#### Mobile Frame (`390px` Width — Light & Dark Variants)
- **Frame Width:** `390px`
- **Content Width:** `350px` (`390px - 2 × 20px`)
- **Layout Grid:**
  - Type: `Columns`
  - Count: `4`
  - Margin: `20px` (Left & Right)
  - Gutter: `16px`
  - Column Width: `75.5px`
- **Component Column Spans on 4-Column Grid:**
  - All primary cards, buttons, and form inputs span all `4 columns` (`350px` width) for maximum readability and thumb comfort.
