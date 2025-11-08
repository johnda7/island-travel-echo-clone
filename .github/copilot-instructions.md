# 🏝️ Phuket Tours Platform - AI Agent Instructions

## Project Overview

This is a **React + TypeScript tour booking platform** for Phuket excursions, built with Vite, styled with Tailwind CSS and shadcn/ui, implementing an iOS 26-inspired design system. The platform operates as a **WordPress-like CMS** where tours are centrally managed through a registry pattern.

**Live Site**: https://phukeo.com  
**Tech Stack**: React 18, TypeScript, Vite, Tailwind, React Router, Leaflet maps, Telegram Bot integration

---

## 🎯 Core Architecture Principles

### 1. Centralized Tour Template System

**All 22 tours** use the `TourPageTemplate` component - a single source of truth for tour pages:

```typescript
// Every tour page follows this pattern (14 lines max):
import { TourPageTemplate } from '@/components/TourPageTemplate';
import { tourData, routePoints } from '@/data/tours/tour-slug';

export default () => <TourPageTemplate tourData={tourData} routePoints={routePoints} />;
```

**Critical**: Changes to `src/components/TourPageTemplate.tsx` affect ALL tours simultaneously. This file is **PROTECTED** - always ask before modifying.

### 2. WordPress-Style Tour Registry

Tours are registered in `src/data/toursRegistry.ts` which acts as the central database:

```typescript
{
  id: 'phi-phi-2days',
  name: 'Пхи-Пхи 2 дня/1 ночь',
  category: 'islands',
  tags: ['море', 'острова', 'снорклинг', 'многодневные'],
  isPopular: true,
  isActive: true,
  priority: 1,
  data: () => Promise.resolve(phiPhi2DaysTourData)
}
```

**Adding a tour**: Create folder in `src/data/tours/`, add to registry → tour appears everywhere automatically (search, menu, cards).

### 3. GPS Routes Are Mandatory

**Critical Bug Fix (Jan 2025)**: All routes MUST use proper `RoutePoint` type with GPS coordinates:

```typescript
// ✅ CORRECT
const route: RoutePoint[] = [
  {
    name: 'Пхукет',
    coordinates: [7.8804, 98.3923], // [lat, lng]
    type: 'start',
    time: '07:00',
    description: 'Выезд из отеля'
  }
];

// ❌ WRONG (causes TypeError)
const route = [
  { location: 'Hotel', icon: 'hotel' } // Old format - breaks maps!
];
```

**Find GPS coordinates**: Use Google Maps right-click → copy coordinates, or check `AI_DOCS/GPS_ROUTES_GUIDE.md` for examples from existing tours.

---

## 🛡️ Protected Components (DO NOT MODIFY Without Permission)

These components are **mission-critical** and power all tours:

1. **`src/components/TourPageTemplate.tsx`** (~800 lines)  
   - Universal tour page renderer for all 22 tours
   - Changes here cascade to entire site
   
2. **`src/components/UniversalBookingModal.tsx`** (~400 lines)  
   - Unified booking form with price calculator
   - Telegram integration for orders
   - localStorage persistence for admin panel

3. **`src/data/toursRegistry.ts`** (~480 lines)  
   - Central tour database
   - Never change existing tour IDs (breaks all links!)
   - Only append new tours to end

**Rule**: If you need to modify these files, **STOP and ASK USER FIRST**.

---

## 🎨 iOS 26 Design System

This project mimics native iOS 26 apps for premium feel and trust:

### Key Design Principles
- **Single blue color**: `#007AFF` for ALL interactive elements
- **Glassmorphism**: `backdrop-filter: blur(20px) saturate(180%)` everywhere
- **SF Pro fonts**: System font stack for native iOS look
- **Smooth animations**: 60 FPS transitions, haptic-like feedback
- **Bottom sheets**: iOS-style modals, not traditional web popups
- **Dark footer**: `#1C1C1E` (NOT purple - this was intentionally changed)
- **Emoji in menus**: 🏝️ 🗺️ ⭐ for visual hierarchy

**Reference tour**: `CheoLanLake` is the golden standard (see `AI_DOCS/IOS26_DESIGN_PROMPT.md`)

### Rating Display
```typescript
// ✅ CORRECT: No parentheses
<span>⭐ 4.9</span>

// ❌ WRONG: Old format
<span>⭐ 4.9 (143 reviews)</span>
```

---

## 📋 Developer Workflows

### Build & Deploy
```bash
# Development
npm run dev                    # Vite dev server on :8080

# Production Build
npm run build                  # Builds to dist/ with postbuild scripts
npm run preview               # Preview production build

# Deployment: ONLY via GitHub Actions!
# Push tags v* or use workflow_dispatch with ref
# See .github/workflows/deploy-canonical.yml
```

**Critical**: NO auto-deploy on push to main. Only manual tags (`v*`) or workflow dispatch.

### Template Backup System
```bash
npm run backup-template        # Backup TourPageTemplate.tsx
npm run restore-template       # Restore from backup
npm run save-golden           # Save current as GOLDEN version
npm run list-backups          # View backup history
```

Use these before ANY changes to `TourPageTemplate.tsx`.

### Common Tasks

**Add a new tour** (15 min workflow):
1. Create folder: `src/data/tours/tour-slug/`
2. Create `static.ts` with `TourData` (use path alias `@/assets/...`)
3. Create `index.ts`: `export * from './static';`
4. Add GPS route points (mandatory!)
5. Register in `toursRegistry.ts` (append to end)
6. Test: Visit `/tours/tour-slug`

**Debugging tours**:
- Check browser console for route coordinate errors
- Verify all tour images use `@/assets/` path alias
- Ensure tour ID in registry matches folder name

---

## 🔍 Search & Collections

### How Search Works
Tours are indexed by:
- `tourData.name` (ID)
- `tourData.tags[]` array
- `tourData.title`, `subtitle`, `description`

Search "пхи пхи" → finds all tours with those tags.

### Collections (Auto Menu System)
Collections are auto-generated from `toursRegistry.ts` tags:
- **beginners** (3 tours): pearls-andaman-sea, dostoprimechatelnosti-phuketa, james-bond-island
- **family** (7 tours): all except extreme activities
- **active** (5 tours): rafting-spa-atv, eleven-islands-mega, etc.
- **premium** (3 tours): phi-phi-2days, eleven-islands-mega, cheow-lan-lake
- **multiday** (2 tours): phi-phi-2days, cheow-lan-lake

**Categories**: `islands`, `adventure`, `cultural` → controls menu sections.

**Filter priority**: `collection > category > tag`

---

## 📱 Telegram Integration Strategy

### Why Telegram is Core to Business Model
- **70% of customers** come from Telegram chat
- **15-25% conversion** vs 2-3% for Booking.com (8x higher!)
- Instant communication builds trust
- Easy viral sharing in group chats

### Technical Integration
- **Telegram Bot**: `@Phuketga` receives booking orders
- **Web App optimization**: Site optimized for Telegram in-app browser
- **Share functionality**: `handleShare()` in `TourPageTemplate` uses Telegram WebApp API with Open Graph fallback
- **Goal (Q1 2026)**: Launch as Telegram Mini App in official catalog

### Booking Flow
```typescript
// UniversalBookingModal sends formatted message to Telegram
const message = `🏝️ Новая бронь тура!
📋 Тур: ${tourData.title}
💰 Цена: ${priceCalc.totalPrice} ${currency}
...`;

// Mobile: Opens WhatsApp with pre-filled message
// Desktop: Saves to localStorage for admin panel
```

---

## 🚫 Critical Rules (Anti-Deception System)

These rules are **strictly enforced** (see `AI_DOCS/NO_DECEPTION_POLICY.md`):

1. **Never claim completion without using actual tools**
   - Don't say "I updated the file" if you didn't call `replace_string_in_file`
   - Don't say "I deployed" if you didn't run deployment commands
   
2. **Always verify results after actions**
   - Read files after editing to confirm changes
   - Run builds to check for errors
   
3. **Ask before modifying protected files**
   - `TourPageTemplate.tsx`
   - `UniversalBookingModal.tsx`
   - `toursRegistry.ts`
   
4. **Never use placeholder coordinates**
   - `[0, 0]` or `[7.0, 98.0]` are NOT acceptable
   - Find real GPS coordinates for all route points

---

## 📚 Documentation Quick Reference

All comprehensive docs are in `AI_DOCS/`:

- **Start here**: `AI_DOCS/README.md` - Navigation hub
- **Quick start**: `AI_DOCS/QUICK_START_NEW_TOUR.md` - Step-by-step tour creation
- **GPS issues**: `AI_DOCS/GPS_ROUTES_GUIDE.md` - Avoid coordinate TypeError
- **Design system**: `AI_DOCS/IOS26_DESIGN_PROMPT.md` - 27 criteria checklist
- **Architecture**: `AI_DOCS/CENTRALIZED_TOUR_SYSTEM.md` - Template system deep dive
- **Main instructions**: `AI_DOCS/AI_PROMPT_INSTRUCTIONS.md` - 4900 lines comprehensive guide

**When stuck**: Read `AI_DOCS/QUICK_REFERENCE.md` for rapid context.

---

## 🎯 Types & Interfaces

Key type definitions in `src/types/Tour.ts`:

```typescript
interface TourData {
  id: string;
  title: string;
  subtitle: string;
  priceAdult: number;
  priceChild: number;
  mainImage: string;
  gallery: string[];
  highlights: string[];
  itinerary?: { day: string; time: string; activity: string; }[];
  // ... see full definition in types file
}

interface RoutePoint {
  name: string;
  coordinates: [number, number]; // [lat, lng] - MANDATORY!
  type: 'start' | 'stop' | 'destination';
  time?: string;
  description?: string;
}
```

---

## 🔧 Common Pitfalls & Solutions

### TypeError: Cannot read properties of undefined (reading 'lat')
**Cause**: Old route format without GPS coordinates  
**Fix**: Convert to `RoutePoint[]` with proper coordinates array

### Tour not appearing in search/menu
**Cause**: Not registered in `toursRegistry.ts` or `isActive: false`  
**Fix**: Add to registry with `isActive: true` and appropriate tags

### Images not loading
**Cause**: Wrong import path (relative vs alias)  
**Fix**: Always use `@/assets/` alias, never `../../assets/`

### Breaking all tours simultaneously
**Cause**: Modified `TourPageTemplate.tsx` without testing  
**Fix**: Use `npm run backup-template` before changes, test thoroughly

### Price calculator showing wrong totals
**Cause**: Modified `UniversalBookingModal.tsx` logic  
**Fix**: Restore from backup - this component is PROTECTED for a reason!

---

## 🚀 Project Philosophy (Perplexity AI Principles)

This project follows the **10 Principles of Aravind Srinivas** (Perplexity AI: $0→$20B):

1. **Product-first**: User experience over everything
2. **Speed & simplicity**: Fast, intuitive, zero friction
3. **Quality obsession**: Every detail matters (iOS 26 design)
4. **Iterate rapidly**: Test, learn, improve continuously
5. **Stay lean**: No bloat, no unnecessary complexity
6. **User feedback loop**: Listen to what works
7. **Differentiate**: Telegram integration = competitive advantage
8. **Focus on retention**: Repeat customers through trust
9. **Build distribution**: Telegram ecosystem = viral growth
10. **Think like CEO**: 70% equity mindset, long-term decisions

**CEO perspective**: Every change should increase bookings or reduce friction.

---

## ✅ Checklist for Tour Pages (27 Criteria)

Before marking a tour complete, verify:

- [ ] GPS coordinates for ALL route points (no [0,0] placeholders)
- [ ] Rating format: `⭐ 4.9` (no parentheses)
- [ ] Gallery images sorted: landscape first, then portrait
- [ ] Blue buttons: `#007AFF` with 14px radius, 50px height
- [ ] Glassmorphism effects on all cards
- [ ] Mobile booking bar appears on scroll
- [ ] Share button works (Telegram WebApp → Web Share API → clipboard)
- [ ] Price calculator displays correctly for adults/children
- [ ] Map renders with proper markers and polyline
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] ... (see full checklist in `AI_DOCS/IOS26_DESIGN_PROMPT.md`)

---

## 🔧 Advanced Patterns & Technical Details

### Supabase Integration (Hybrid Static+CMS Architecture)

**Current Status**: Hybrid approach - static tours take priority, CMS tours as fallback

**useCMSTours Hook** (`src/hooks/useCMSTours.ts`):
- Fetches tours from Supabase with full relations (gallery, itinerary)
- **Excludes protected static tours** (`phi-phi-2days`, `avatar-plus-hangdong-adventure`)
- Returns `CMSTour` interface with enriched data
- Used by `DynamicTourPage` component for CMS-based tours

**Key Files**:
- `src/integrations/supabase/client.ts` - Supabase client configuration
- `src/hooks/useCMSTours.ts` - Tour fetching logic with protections
- `supabase/migrations/` - Database schema migrations

**Rule**: Always check `toursRegistry.ts` first - static tours have priority over CMS entries.

### Telegram Bot Integration (Separate Node.js Service)

**Location**: `bot/` directory (separate from React app)

**Key Files**:
- `bot/welcome-message.js` - Main bot logic with commands
- `bot/analyzer-bot.js` - Analytics and insights bot
- `bot/package.json` - Separate dependencies (telegraf, dotenv)

**Integration Pattern**:
```javascript
// Bot links to React app
bot.command('tours', (ctx) => {
  ctx.reply('🗺️ Открыть каталог', {
    reply_markup: {
      inline_keyboard: [[
        { text: '🗺️ Каталог', web_app: { url: 'https://phukeo.com/#/' } }
      ]]
    }
  });
});
```

**Deployment**: Bot runs separately (PM2/Docker), independent of React app deployment.

### Build & Deployment Pipeline

**Build Process** (`npm run build`):
1. Vite bundles React app → `dist/`
2. `scripts/postbuild.cjs` runs:
   - Adds build timestamp to `index.html`
   - Creates invisible `404.html` redirect for SPA routing
   - Copies CNAME, robots.txt, sitemap.xml to dist
3. `scripts/generate-og-pages.mjs` runs:
   - Generates static HTML pages with Open Graph tags for each tour
   - Enables proper Telegram preview with unique images per tour

**Deployment Triggers** (`.github/workflows/deploy-canonical.yml`):
- **Tags**: Push `v*` tags (e.g., `v1.2.3`)
- **Manual**: `workflow_dispatch` with custom ref input
- **NO auto-deploy** on main branch pushes

**Validation**: Workflow fetches `https://phukeo.com/__build.txt` to verify deployment matches commit SHA.

### SEO & Social Media Optimization

**SEO Component** (`src/components/SEO.tsx`):
- React Helmet for dynamic meta tags
- Open Graph tags optimized for Telegram/Facebook
- Twitter Card support
- JSON-LD structured data for Google
- Image dimensions: 1200x630px for social previews

**Key Features**:
```typescript
<SEO 
  title="Tour Name"
  description="..."
  image="/assets/tour-image.jpg" // Auto-prefixed with phukeo.com
  price="4500"
  rating="4.9"
  tourName="Phi Phi 2 Days"
/>
```

**robots.txt**: Optimized for Googlebot, Yandex, TelegramBot, facebookexternalhit

**sitemap.xml**: Manually maintained, updated when adding new tours/pages

### shadcn/ui Component Library

**Full Component Set** (48 components in `src/components/ui/`):
- Forms: input, textarea, select, checkbox, radio-group, calendar
- Feedback: alert, toast, sonner, dialog, sheet
- Navigation: breadcrumb, menubar, navigation-menu, tabs
- Data: table, card, accordion, collapsible
- Advanced: command, carousel, resizable, sidebar

**Usage Pattern**:
```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// All components follow shadcn/ui conventions
<Button variant="default" size="lg">Book Now</Button>
```

**Styling**: Tailwind CSS with CSS variables in `src/index.css` for theme colors.

### Route Structure & Navigation

**HashRouter Pattern** (GitHub Pages compatibility):
```typescript
// All routes use /#/ prefix
<Route path="/" element={<Index />} />
<Route path="/tours" element={<Tours />} />
<Route path="/tours/phi-phi-2days" element={<PhiPhi2Days1NightNew />} />

// Legacy redirects
<Route path="/excursion/phi-phi-2-days-1-night" element={<PhiPhi2Days1NightNew />} />
```

**Dynamic Tour Routes**: `DynamicTourPage` component fetches from Supabase for non-static tours.

**Protected Routes**: Static tours defined in `toursRegistry.ts` override CMS entries.

### Image Optimization Strategy

**Path Alias Pattern**:
```typescript
// ✅ ALWAYS use @/ alias (not relative paths)
import image from "@/assets/tour-name/image.jpg";

// ❌ NEVER use relative paths
import image from "../../assets/tour-name/image.jpg";
```

**Gallery Sorting**: `TourPageTemplate` auto-sorts images (landscape first, then portrait) using Image API.

**Formats**: WebP preferred, JPEG fallback. Images stored in `src/assets/[tour-name]/`.

### Error Handling & Debugging

**Error Boundary** (`src/components/ErrorBoundary.tsx`):
- Catches React errors globally
- Displays user-friendly error page
- Logs errors to console for debugging

**Common Debug Commands**:
```bash
# Check TypeScript errors
npm run build

# Check for runtime errors
npm run dev
# Open http://localhost:8080 and check console

# Verify GPS coordinates
# TypeError: Cannot read 'lat' → Missing coordinates array in RoutePoint
```

### Performance Optimization

**react-snap** (in package.json):
- Pre-renders specific routes for faster initial load
- Configured in `reactSnap` section of package.json
- Includes top tours: phi-phi-2days, similan-islands, etc.

**Vite Config**:
- SWC for fast React transpilation
- Path alias `@/*` → `./src/*`
- Base URL `/` for custom domain

**TypeScript Config**:
- `skipLibCheck: true` for faster builds
- `noImplicitAny: false` (lax mode for rapid development)
- Path mapping for `@/*` imports

---

## 📚 Additional Documentation

**Comprehensive Guides** in `AI_DOCS/`:
- **4942-line master guide**: `AI_PROMPT_INSTRUCTIONS.md` - Full project philosophy and patterns
- **Perplexity AI principles**: 10 principles for $0→$20B growth mindset
- **Template protection**: `TOUR_TEMPLATE_PROTECTION.md` - 5-level protection system
- **Migration status**: `MIGRATION_COMPLETE_2025.md` - All 22 tours centralized

**Quick References**:
- `CHEATSHEET.md` - One-page command reference
- `QUICK_REFERENCE.md` - Project structure at a glance
- `DOMAIN_QUICK_REFERENCE.md` - DNS and domain config

---

**Questions or clarifications needed?** Always refer to `AI_DOCS/` or ask the user directly. When in doubt, preserve existing patterns rather than innovate - consistency is critical for this centralized architecture.
