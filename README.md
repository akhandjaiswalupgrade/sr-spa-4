# Shirui Wellness Spa — Version 4 (`sr-spa-4`)

A production-ready, ultra-premium single-page website for **Shirui Wellness Spa** located in Neknampur, Hyderabad. Designed with an airy, calming **Light Theme** aesthetic featuring tactile **3D elevation** and **high color contrast**.

## Key Features in Version 4
- **Light Theme Design System**: Alternating pure white (`#ffffff`) and warm alabaster stone (`#f5f0eb`), vibrant rose gradients (`#df548f` → `#c83b74` → `#a81d52`), deep near-black headings (`#0a0f1d`), and crisp slate body typography (`#1e293b`).
- **Tactile 3D Depth System**: Multi-layered ambient occlusion shadows (`shadow-3d`, `shadow-3d-hover`), beveled buttons with top reflection highlights (`border-t border-white/35`) and click depression (`active:translate-y-0.5`).
- **Interactive Anatomy Experience**: 4-phase muscle reveal slider with grooved track (`shadow-inset-groove`), 3D tactile dial handle (`shadow-dial-3d`), interactive pinpoint muscle zones, and educational disclaimer.
- **Session Configurator**: 4-step interactive session builder with custom duration, pressure, and automated WhatsApp request generation.
- **Treatment Discovery & Drawer**: Category tabs with tactile 3D pills, 3D bead pressure rating indicators (1-5 dots), and slide-out details drawer.
- **Regenerated Logo**: Crisp Slate-900 typography, soft rose lotus mark, and organic Shirui Lily flower optimized for light backgrounds.
- **Draggable Spa Gallery & Fullscreen Lightbox**: Horizontal swipe strip with tactile 3D scroll buttons and keyboard navigation.
- **Guest Testimonials & Reviews**: Verified review carousel and 4.9★ Google rating card.
- **Location, Map & Scheduling**: Neknampur location guide, hours, and light-themed Google Maps embed.
- **Appointment Request Modal**: Validated with React Hook Form and Zod with instant WhatsApp confirmation handoff.
- **Mobile Persistent Conversion Bar**: Floating conversion dock for instant Call, WhatsApp, and Direction actions.

## Deploying to Vercel

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Import the repository: **`akhandjaiswalupgrade/sr-spa-4`**.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**. No extra environment variables or configuration needed!

## Running Locally

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to view the website.

### Production Build
```bash
npm run build
npm start
```
