# Design System Specification: MedSim Pro Dashboard (v3.0)

## 1. Visual Direction
The UI style follows the provided Trainee Dashboard reference: **clean, data-first, clinical SaaS**.

- **Calm:** soft neutral backgrounds and low-contrast separators
- **Legible:** strong hierarchy for titles, KPIs, and trends
- **Operational:** compact controls, dense but readable data tables

---

## 2. Foundation Tokens

### 2.1 Color System

#### Light Mode (primary target)
- **App Background:** `#F5F7FB`
- **Sidebar Background:** `#F7F9FC`
- **Surface/Card:** `#FFFFFF`
- **Surface Alt:** `#F8FAFC`
- **Border:** `#E5EAF2`
- **Text Primary:** `#1F2937`
- **Text Secondary:** `#6B7280`
- **Text Tertiary:** `#94A3B8`
- **Primary Blue:** `#2F6FEE`
- **Primary Blue Soft:** `#EAF1FF`
- **Success:** `#22C55E`
- **Warning:** `#F59E0B`
- **Danger:** `#EF4444`

#### Dark Mode (supported)
- **App Background:** `#0F172A`
- **Sidebar Background:** `#111C31`
- **Surface/Card:** `#182338`
- **Surface Alt:** `#1F2D46`
- **Border:** `#27344A`
- **Text Primary:** `#E5EAF3`
- **Text Secondary:** `#9AA8BC`
- **Primary Blue:** `#5B8FFF`

### 2.2 Typography
- **Family:** Inter
- **Page Title:** 18-20px / 600
- **Card Title:** 14-16px / 600
- **Body:** 13-14px / 400
- **Meta/Labels:** 11-12px / 500
- **KPI Value:** 34-40px equivalent (`2.1rem` range) / 700

### 2.3 Radius, Borders, Elevation
- **Card Radius:** 12px
- **Control Radius:** 10px
- **Pill Radius:** full
- **Border Width:** 1px
- **Surface Shadow:** very subtle (`0 1px 2px rgba(15,23,42,0.04)`)
- **Elevated Shadow:** soft (`0 8px 24px -18px rgba(15,23,42,0.25)`)

---

## 3. Layout & Component Rules

### 3.1 Shell
- Left persistent sidebar, muted background
- Top header with page title and user identity
- Main content constrained and padded for dashboard readability

### 3.2 Dashboard Composition
- Row of KPI cards (4-up on desktop)
- Main analytics row (trend chart + module donut split)
- Session history table card below

### 3.3 States
- Active nav item: soft blue background + primary text
- Success metrics: green text
- Hover on cards/rows: subtle background tint, not heavy motion

---

## 4. Tailwind v4 Implementation Notes
- All visual primitives are driven from `src/index.css` semantic tokens.
- Use semantic utilities (`bg-card`, `text-muted-foreground`, `border-border`, `text-success`) instead of hardcoded palettes.
- Continue using `cva` + `cn` for reusable class systems.
