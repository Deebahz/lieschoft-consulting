# Lieschoft Consulting

A modern consulting website built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. This project is designed to showcase a premium consulting brand with a clean, professional interface and a reusable component architecture.

## 🚀 Project Overview

- Built with `next` `16.2.10` and the App Router.
- Uses `tailwindcss` v4 for styling.
- Animations are handled with `framer-motion`.
- Iconography comes from `lucide-react`.
- Form and validation utilities are available via `react-hook-form`, `zod`, and `@hookform/resolvers`.

## ⚙️ Getting Started

### Requirements

- Node.js 20 or newer
- npm, Yarn, or pnpm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then visit `http://localhost:3000`.

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm run start
```

### Lint the codebase

```bash
npm run lint
```
## 🔒 Admin security

This project protects the `/admin` panel using Basic Auth via middleware.

Required environment variables:

- `ADMIN_USER`
- `ADMIN_PASS`

Example local setup:

```bash
ADMIN_USER=admin
ADMIN_PASS=supersecret
npm run dev
```

Without these values, access to `/admin` will fail with a server error.
## 📁 Project Structure

- `app/` — main application routes and pages
- `components/` — reusable UI components and layout pieces
- `components/sections/` — page sections used on the homepage and landing pages
- `data/` — static content for services, industries, testimonials, team, and blog items
- `lib/` — constants, navigation data, and shared helpers
- `public/` — images, logos, and icon assets

## 🎨 Design System

### Brand Personality

The site should feel:

- Professional
- Trustworthy
- Premium
- Modern
- Intelligent
- Data-driven
- Innovative
- Minimalist

> Users should immediately feel: “These people know what they are doing.”

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#0F172A` | Navigation, headings, footer |
| Secondary | `#1E293B` | Body text |
| Accent | `#059669` | Buttons, highlights, success indicators |
| Gold | `#D4AF37` | Premium accents, icons |
| Background | `#FFFFFF` | Page background |
| Surface | `#F8FAFC` | Cards and section surfaces |
| Border | `#E2E8F0` | Dividers and card borders |
| Muted | `#64748B` | Secondary text |

### Typography

- Headings: `Playfair Display`
- Body: `Inter`

Use the heading font for hero titles, section headings, and major page titles. Use the body font for paragraphs, button labels, navigation, and card text.

### Spacing System

- Section padding: `py-24`
- Card padding: `p-8`
- Gap between cards: `gap-8`
- Container width: `max-w-7xl`
- Border radius: `rounded-2xl`

### Elevation and Shadows

Use subtle shadows and avoid heavy effects.

- `shadow-sm`
- `shadow-md`
- `hover:shadow-xl`

### Motion

Use Framer Motion for understated animation across:

- Fade-in sections
- Slide-up cards
- Counters and statistics
- Hero content entrance
- Mobile menu transitions
- Button interactions

Animations should feel smooth, polished, and minimal.

### Button Styles

#### Primary

- Emerald background
- White text
- Rounded corners
- Slight scale on hover
- Use for main actions like `Book Consultation` and `Contact Us`

#### Secondary

- White background
- Navy border
- Navy text
- Use for `Learn More`, `Read Article`, and secondary actions

#### Ghost

- Transparent background
- Used in navigation, footer, and low-priority links

### Cards

Every card should include:

- White background
- Rounded corners
- Soft shadow
- Hover elevation
- Consistent padding

Use cards for services, team profiles, case studies, testimonials, industries, and content highlights.

### Icons

Use `lucide-react` for consistent iconography.

Recommended icons:

- `TrendingUp`
- `Briefcase`
- `Building2`
- `Calculator`
- `Landmark`
- `ShieldCheck`
- `BarChart3`
- `Database`
- `ArrowRight`

## 🧭 Homepage Flow

The homepage follows a clear landing page structure:

1. Navbar
2. Hero
3. Trusted By / Logos
4. About
5. Services
6. Industries
7. Consulting Process
8. Statistics
9. Case Studies
10. Testimonials
11. Insights
12. Call to Action
13. Newsletter
14. Footer

## 📌 Notes

- Keep the interface minimal and premium.
- Emphasize clarity, hierarchy, and legibility.
- Maintain consistent spacing and typography across sections.
- Use the design system as the primary reference for new pages and components.

Home

About

Services

Industries

Insights

Careers

Contact

Book Consultation
Footer Layout
------------------------------------------------------

LOGO

Helping businesses make smarter financial decisions.

------------------------------------------------------

Company

About

Services

Careers

Contact

------------------------------------------------------

Services

Financial Advisory

Audit

Tax

Investment

Technology

------------------------------------------------------

Resources

Insights

Case Studies

Privacy

Terms

------------------------------------------------------

Contact

Email

Phone

Office

LinkedIn

Instagram

------------------------------------------------------

© 2026 Lieschoft Consulting