# AI Career Shield - Professional Design System Specification

> **Purpose:** Replace emojis with professional icons and establish clean typography for premium SaaS aesthetic

---

## 🎨 Design Philosophy

**Current State:** Emojis (🎯, ✨, 📊) feel consumer-grade  
**Target State:** Professional, trustworthy, Apple-style premium design  
**Inspiration:** Linear, Vercel, Stripe, Notion

---

## 1. Icon System

### Recommended Library: **Lucide Icons**

**Why Lucide:**

- ✅ Open-source and free
- ✅ Clean, consistent stroke-based style
- ✅ 1,000+ icons covering all use cases
- ✅ Customizable (color, size, stroke width)
- ✅ React/Vue support (perfect for Next.js)
- ✅ SVG format (scalable, performant)
- ✅ Active community and regular updates

**Installation:**

```bash
npm install lucide-react
```

**Alternative Options:**

- **Heroicons** - Clean, modern, Tailwind CSS native (fewer icons)
- **Phosphor Icons** - Multiple weights (thin, light, bold, duotone) for visual variety

---

### Icon Mapping (Emoji → Lucide)

#### Landing Page

| Current Emoji | Lucide Icon | Component | Usage |
|---------------|-------------|-----------|-------|
| 🎯 | `Target` | Hero badge | "Includes a 30/60/90-day roadmap" |
| ⚡ | `Zap` | Crisis section | "Skills are shifting faster" |
| 🔍 | `Search` | How It Works Step 1 | "Map your strengths" |
| 🎯 | `Compass` | How It Works Step 2 | "Get your best-fit paths" |
| 🚀 | `Rocket` | How It Works Step 3 | "Start your roadmap" |
| ✅ | `CheckCircle2` | FAQ answers | Affirmative responses |
| 📊 | `BarChart3` | Stats/metrics | Risk score visualization |
| 💡 | `Lightbulb` | Insights | Factor evidence |
| 🛡️ | `Shield` | Brand identity | Logo/protection theme |
| 📈 | `TrendingUp` | Growth/progress | Career advancement |

#### Assessment Flow

| Current Emoji | Lucide Icon | Component | Usage |
|---------------|-------------|-----------|-------|
| 💼 | `Briefcase` | Job title input | Role/Major field |
| 🏢 | `Building2` | Industry input | Industry selector |
| ⚙️ | `Settings` | Skills input | Skills/interests |
| 📊 | `BarChart3` | Results | Risk score display |
| 🎯 | `Target` | Factors | Risk drivers |
| 💡 | `Lightbulb` | Evidence | Why it matters |
| 🛠️ | `Wrench` | Mitigation | How to adapt |
| 🗺️ | `Map` | Roadmap | 30/60/90 plan |
| 🔄 | `RefreshCw` | Adjacencies | Pivot paths |

---

### Implementation Example

**Before (Emoji):**

```tsx
<div className="badge">
  🎯 Includes a 30/60/90-day roadmap
</div>
```

**After (Lucide):**

```tsx
import { Target } from 'lucide-react';

<div className="badge">
  <Target className="w-4 h-4" />
  Includes a 30/60/90-day roadmap
</div>
```

---

### Icon Styling Guidelines

**Size Scale:**

- Small (UI elements): `w-4 h-4` (16px)
- Medium (section headers): `w-5 h-5` (20px)
- Large (hero elements): `w-6 h-6` (24px)
- Extra Large (feature highlights): `w-8 h-8` (32px)

**Stroke Width:**

- Default: `strokeWidth={2}` (balanced)
- Thin (subtle): `strokeWidth={1.5}` (secondary elements)
- Bold (emphasis): `strokeWidth={2.5}` (CTAs, important icons)

**Color:**

- Primary: `text-blue-400` (brand color)
- Secondary: `text-gray-400` (neutral)
- Success: `text-green-400` (positive outcomes)
- Warning: `text-yellow-400` (caution)
- Error: `text-red-400` (high risk)

---

## 2. Typography System

### Primary Font: **Geist Sans**

**Why Geist:**

- ✅ Already in project (Next.js default)
- ✅ Designed for developers and designers
- ✅ Exceptional readability in UI/UX
- ✅ Swiss design principles (simplicity, precision)
- ✅ Variable font (responsive across screen sizes)
- ✅ Modern, professional aesthetic
- ✅ Free and open-source

**Current Implementation:**

```tsx
// Already using Geist via next/font
import { GeistSans } from 'geist/font/sans';
```

**Keep it!** Geist is perfect for AI Career Shield.

---

### Alternative Recommendations (If Switching)

#### Option 1: **Inter** (Most Popular SaaS Font)

**Pros:**

- Exceptional on-screen readability
- Tall x-height, open apertures
- Variable font with numerous weights
- Neutral, modern tone
- Used by: GitHub, Figma, Linear

**Installation:**

```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

#### Option 2: **Poppins** (Geometric, Friendly)

**Pros:**

- Clean geometric shapes
- Modern, approachable feel
- Great for headers and navigation
- Broad language support

**Cons:**

- Less ideal for long-form body text
- Can feel less professional than Inter/Geist

**Best Use:** Headers only, pair with Inter/Geist for body

---

### Typography Scale

**Headings:**

```css
h1: 3.5rem (56px) - font-bold - tracking-tight
h2: 2.5rem (40px) - font-bold - tracking-tight
h3: 1.875rem (30px) - font-semibold
h4: 1.5rem (24px) - font-semibold
h5: 1.25rem (20px) - font-medium
h6: 1rem (16px) - font-medium
```

**Body:**

```css
Large: 1.125rem (18px) - font-normal - leading-relaxed
Base: 1rem (16px) - font-normal - leading-normal
Small: 0.875rem (14px) - font-normal - leading-normal
Tiny: 0.75rem (12px) - font-normal - leading-tight
```

**Special:**

```css
Hero: 4rem (64px) - font-extrabold - tracking-tighter
Subhead: 1.25rem (20px) - font-normal - text-gray-400
Caption: 0.875rem (14px) - font-medium - text-gray-500
```

---

### Font Weight Usage

| Weight | Tailwind Class | Use Case |
|--------|----------------|----------|
| 300 | `font-light` | Rarely used (too thin for UI) |
| 400 | `font-normal` | Body text, paragraphs |
| 500 | `font-medium` | Subheadings, labels, buttons |
| 600 | `font-semibold` | Section headers, emphasis |
| 700 | `font-bold` | Page titles, CTAs |
| 800 | `font-extrabold` | Hero headlines only |

---

### Line Height (Leading)

| Tailwind Class | Value | Use Case |
|----------------|-------|----------|
| `leading-tight` | 1.25 | Headlines, short text |
| `leading-snug` | 1.375 | Subheadings |
| `leading-normal` | 1.5 | Body text (default) |
| `leading-relaxed` | 1.625 | Long-form content |
| `leading-loose` | 2 | Rarely used (too spacious) |

---

### Letter Spacing (Tracking)

| Tailwind Class | Value | Use Case |
|----------------|-------|----------|
| `tracking-tighter` | -0.05em | Large hero text |
| `tracking-tight` | -0.025em | Headings |
| `tracking-normal` | 0em | Body text (default) |
| `tracking-wide` | 0.025em | Uppercase labels |
| `tracking-wider` | 0.05em | Buttons, badges |

---

## 3. Color System

### Brand Colors

```css
/* Primary (Blue) */
--blue-50: #eff6ff;
--blue-400: #60a5fa;  /* Primary brand */
--blue-500: #3b82f6;  /* Hover states */
--blue-600: #2563eb;  /* Active states */

/* Neutral (Gray) */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-400: #9ca3af;  /* Secondary text */
--gray-500: #6b7280;  /* Tertiary text */
--gray-800: #1f2937;  /* Dark mode bg */
--gray-900: #111827;  /* Darkest bg */

/* Semantic */
--green-400: #4ade80;  /* Success, low risk */
--yellow-400: #facc15; /* Warning, medium risk */
--red-400: #f87171;    /* Error, high risk */
```

---

## 4. Implementation Roadmap

### Phase 1: Icon Replacement (1-2 hours)

1. Install Lucide: `npm install lucide-react`
2. Create icon mapping reference (use table above)
3. Replace emojis in `app/page.tsx` (landing page)
4. Replace emojis in `app/assessment/page.tsx` (assessment flow)
5. Test visual consistency

### Phase 2: Typography Refinement (30 mins)

1. Verify Geist is properly loaded
2. Apply consistent heading scale
3. Ensure proper font weights
4. Check line heights for readability

### Phase 3: Visual QA (30 mins)

1. Review all pages for consistency
2. Check mobile responsiveness
3. Verify dark mode compatibility
4. Test icon sizes and spacing

---

## 5. Component Examples

### Badge with Icon

```tsx
import { Target } from 'lucide-react';

<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
  <Target className="w-4 h-4 text-blue-400" strokeWidth={2} />
  <span className="text-sm font-medium text-blue-400">
    Includes a 30/60/90-day roadmap
  </span>
</div>
```

### Section Header with Icon

```tsx
import { Compass } from 'lucide-react';

<div className="flex items-center gap-3 mb-6">
  <div className="p-3 bg-blue-500/10 rounded-xl">
    <Compass className="w-6 h-6 text-blue-400" strokeWidth={2} />
  </div>
  <div>
    <h3 className="text-2xl font-bold text-white">Get your best-fit paths</h3>
    <p className="text-gray-400 text-sm">3-5 future-ready role ideas matched to your strengths</p>
  </div>
</div>
```

### Risk Factor Card with Icons

```tsx
import { Target, Lightbulb, Wrench } from 'lucide-react';

<div className="glass-panel p-6 rounded-xl">
  <div className="flex items-start gap-3 mb-4">
    <Target className="w-5 h-5 text-red-400 mt-1" strokeWidth={2} />
    <div>
      <h4 className="font-semibold text-white">Repetitive Task Exposure</h4>
      <p className="text-sm text-gray-400 mt-1">High automation risk</p>
    </div>
  </div>
  
  <div className="space-y-4 ml-8">
    <div className="flex items-start gap-2">
      <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5" strokeWidth={2} />
      <div>
        <p className="text-sm font-medium text-gray-300">Evidence</p>
        <p className="text-sm text-gray-400">Your role involves data entry and invoice processing...</p>
      </div>
    </div>
    
    <div className="flex items-start gap-2">
      <Wrench className="w-4 h-4 text-green-400 mt-0.5" strokeWidth={2} />
      <div>
        <p className="text-sm font-medium text-gray-300">Mitigation</p>
        <p className="text-sm text-gray-400">Learn financial analysis to move from data entry to insights...</p>
      </div>
    </div>
  </div>
</div>
```

---

## 6. Design System Checklist

**Before Launch:**

- [ ] All emojis replaced with Lucide icons
- [ ] Consistent icon sizes across pages
- [ ] Proper stroke widths applied
- [ ] Typography scale implemented
- [ ] Font weights consistent
- [ ] Line heights optimized for readability
- [ ] Color system applied consistently
- [ ] Mobile responsiveness verified
- [ ] Dark mode compatibility checked
- [ ] Accessibility (contrast ratios) validated

---

## 7. Accessibility Notes

**Icon + Text:**

- Always pair icons with text labels
- Don't rely on icons alone for meaning
- Use `aria-label` for icon-only buttons

**Color Contrast:**

- Text on dark bg: minimum 4.5:1 ratio
- Large text (18px+): minimum 3:1 ratio
- Icons: minimum 3:1 ratio

**Example:**

```tsx
<button aria-label="View roadmap">
  <Map className="w-5 h-5" />
  <span>View Roadmap</span>
</button>
```

---

## 8. Performance Considerations

**Icon Optimization:**

- Lucide icons are tree-shakeable (only import what you use)
- SVG format = small file size
- No icon font loading overhead

**Font Optimization:**

- Geist is already optimized by Next.js
- Variable font = one file for all weights
- Subset to Latin characters only

---

**Status:** Ready to implement  
**Estimated Time:** 2-3 hours total  
**Impact:** Transforms product from consumer-grade to professional SaaS aesthetic
