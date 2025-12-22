# Website Color Palette - Dark Mode

This document lists all colors used in the website. The website uses a **dark mode** theme with **soft dark gray** backgrounds and **purple/violet** accent colors.

## Main Color Variables (Defined in `src/index.css`)

These are the primary colors used throughout the website. **Edit these in `src/index.css` to change the overall theme:**

```css
:root {
  /* Dark Mode Color Palette */
  --primary-color: #a855f7;              /* Vibrant Purple */
  --primary-dark: #9333ea;               /* Darker Purple (hover) */
  --secondary-color: #c084fc;            /* Lighter Purple */
  --accent-glow: #7c3aed;                /* Deep Purple (glows) */

  --text-primary: #e5e5e5;               /* Light Gray (main text) */
  --text-secondary: #b3b3b3;             /* Medium Gray (secondary text) */
  --text-muted: #888888;                 /* Darker Gray (meta) */

  --bg-primary: #121212;                 /* Soft Dark Gray (main bg) */
  --bg-secondary: #1e1e1e;               /* Slightly Lighter (cards) */
  --bg-tertiary: #2a2a2a;                /* Even Lighter (inputs) */

  --border-color: #2a2a2a;               /* Subtle Borders */
  --border-hover: #3a3a3a;               /* Hover/Focus Borders */
  --divider: rgba(255, 255, 255, 0.08);  /* Very Subtle Dividers */

  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
  --shadow-accent: 0 0 20px rgba(168, 85, 247, 0.3);
}
```

## Component-Specific Colors

### Hero Section (`src/components/sections/Hero.css`)

- **Hero Background Gradient**:
  - Start: `rgba(18, 18, 18, 0.85)` (Dark gray with 85% opacity)
  - End: `rgba(124, 58, 237, 0.4)` (Purple with 40% opacity)
  - **Note**: This overlays the background image (`main-wallpaper.png`)

- **Hero Text**: `white`

- **Hero Button Primary**:
  - Background: `var(--primary-color)` (#a855f7)
  - Text: `white`
  - Hover Background: `var(--primary-dark)` (#9333ea)
  - Hover Shadow: `var(--shadow-accent)` (Purple glow)

- **Hero Button Secondary**:
  - Background: `rgba(255, 255, 255, 0.1)`
  - Border: `var(--primary-color)` (#a855f7)
  - Text: `var(--primary-color)` (#a855f7)
  - Hover Background: `var(--primary-color)`
  - Hover Text: `white`
  - Hover Shadow: `var(--shadow-accent)` (Purple glow)

### Navigation (`src/components/layout/Header.css`)

- **Navigation Background**: `rgba(30, 30, 30, 0.95)` (Dark gray with 95% opacity)
- **Backdrop Filter**: `blur(10px)` (Frosted glass effect)

- **Nav Links**:
  - Default: `var(--text-primary)` (#e5e5e5)
  - Active/Hover: `var(--primary-color)` (#a855f7)

- **Active Link Underline**:
  - Gradient from `var(--primary-color)` to `var(--secondary-color)` (#a855f7 to #c084fc)

### Footer/Socials (`src/components/layout/Footer.css`)

- **Footer Background**: `var(--bg-secondary)` (#1e1e1e)

- **Footer Text**: `var(--text-primary)` (#e5e5e5)

- **Social Links**:
  - Default: `var(--text-primary)` (#e5e5e5)
  - Hover Background: `rgba(168, 85, 247, 0.1)` (Purple with 10% opacity)

- **Footer Border**: `var(--divider)` (rgba(255, 255, 255, 0.08))

### Contact Form (`src/components/sections/Contact.css`)

- **Section Background**: `var(--bg-secondary)` (#1e1e1e)

- **Form Background**: `var(--bg-primary)` (#121212)

- **Form Input Background**: `var(--bg-tertiary)` (#2a2a2a)

- **Form Input Border**: `var(--border-color)` (#2a2a2a)

- **Form Input Text**: `var(--text-primary)` (#e5e5e5)

- **Form Input Focus Border**: `var(--primary-color)` (#a855f7)

- **Form Input Focus Shadow**: `var(--shadow-accent)` (Purple glow)

### Projects Page (`src/components/sections/Projects.css`)

- **Page Background**: `var(--bg-secondary)` (#1e1e1e)

- **Project Card Background**: Uses `Card` component (var(--bg-primary) #121212)

- **Project Logo Container**: `var(--bg-tertiary)` (#2a2a2a)

- **Project Title**: `var(--text-primary)` (#e5e5e5)

- **Project Description**: `var(--text-secondary)` (#b3b3b3)

- **Tech Tag Background**: `var(--bg-tertiary)` (#2a2a2a)
- **Tech Tag Text**: `var(--primary-color)` (#a855f7)
- **Tech Tag Border**: `var(--border-color)` (#2a2a2a)

- **Logo Drop Shadow**: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))` (Dark shadow for visibility)

### Writings Page (`src/components/sections/Writings.css`)

- **Page Background**: `var(--bg-primary)` (#121212)

- **Writing Card Background**: `var(--bg-secondary)` (#1e1e1e)

- **Writing Title**: `var(--text-primary)` (#e5e5e5)

- **Writing Description**: `var(--text-secondary)` (#b3b3b3)

- **Writing Date**: `var(--text-muted)` (#888888)

- **PDF Modal Overlay**: `rgba(0, 0, 0, 0.8)` (Black with 80% opacity)

- **PDF Modal Background**: `var(--bg-primary)` (#121212)

- **PDF Modal Shadow**: `0 20px 60px rgba(0, 0, 0, 0.3)` (Dark shadow)

### About Page (`src/components/sections/About.css`)

- **Page Background**: `var(--bg-primary)` (#121212)

- **About Text**: `var(--text-secondary)` (#b3b3b3)

### Card Component (`src/components/ui/Card.css`)

- **Card Background**: `var(--bg-primary)` (#121212)

- **Card Border**: `var(--border-color)` (#2a2a2a)

- **Card Shadow**: `var(--shadow)` (Dark shadow)

- **Card Hover Border**: `var(--border-hover)` (#3a3a3a)

- **Card Hover Shadow**: `var(--shadow-accent)` (Purple glow)

### Button Component (Global in `src/index.css`)

- **Primary Button**:
  - Background: `var(--primary-color)` (#a855f7)
  - Text: `white`
  - Hover Background: `var(--primary-dark)` (#9333ea)
  - Hover Shadow: `var(--shadow-accent)` (Purple glow)

- **Secondary Button**:
  - Background: `transparent`
  - Border: `var(--primary-color)` (#a855f7)
  - Text: `var(--primary-color)` (#a855f7)
  - Hover Background: `var(--primary-color)`
  - Hover Text: `white`
  - Hover Shadow: `var(--shadow-accent)` (Purple glow)

## Quick Color Reference

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary (Purple) | `#a855f7` | Buttons, links, accents, interactive elements |
| Primary Dark | `#9333ea` | Hover states for buttons |
| Secondary (Light Purple) | `#c084fc` | Gradients, secondary accents |
| Accent Glow | `#7c3aed` | Purple glow effects on hover |
| Text Primary | `#e5e5e5` | Main text, headings (light gray) |
| Text Secondary | `#b3b3b3` | Secondary text, descriptions (medium gray) |
| Text Muted | `#888888` | Meta information, dates (darker gray) |
| Background Primary | `#121212` | Main page background (soft dark gray) |
| Background Secondary | `#1e1e1e` | Cards, elevated surfaces (lighter dark gray) |
| Background Tertiary | `#2a2a2a` | Inputs, nested elements (even lighter) |
| Border | `#2a2a2a` | Subtle borders |
| Border Hover | `#3a3a3a` | Borders on hover/focus |
| Divider | `rgba(255, 255, 255, 0.08)` | Very subtle dividers |
| White | `#ffffff` | Hero text, button text on colored backgrounds |

## How to Change Colors

### Option 1: Change Theme Colors (Recommended)
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #YOUR_COLOR;
  --primary-dark: #YOUR_DARKER_COLOR;
  --secondary-color: #YOUR_SECONDARY_COLOR;
  /* etc. */
}
```

### Option 2: Switch to Light Mode
To convert back to light mode, you would need to:
1. Change background colors: `--bg-primary` to light colors (e.g., #ffffff)
2. Change text colors: `--text-primary` to dark colors (e.g., #1f2937)
3. Update shadows to be lighter
4. Update component-specific hardcoded colors

### Option 3: Change Accent Color
To change from purple to another color (e.g., blue, green):
1. Update `--primary-color` with your new accent color
2. Update `--primary-dark` with a darker shade
3. Update `--secondary-color` with a lighter/complementary shade
4. Update `--accent-glow` for the glow effect
5. Update `--shadow-accent` to match your new color with 0.3 opacity

Example for Cyan/Blue:
```css
--primary-color: #06b6d4;              /* Cyan */
--primary-dark: #0891b2;               /* Darker Cyan */
--secondary-color: #22d3ee;            /* Light Cyan */
--accent-glow: #0e7490;                /* Deep Cyan */
--shadow-accent: 0 0 20px rgba(6, 182, 212, 0.3);
```

### Option 4: Change Specific Component Colors
Edit the individual CSS files in `src/components/` for component-specific changes.

### Option 5: Change Hero Page Gradient
Edit `src/components/sections/Hero.css`:
```css
.home {
  background: linear-gradient(135deg, rgba(18, 18, 18, 0.85) 0%, rgba(YOUR_R, YOUR_G, YOUR_B, 0.4) 100%),
    url('/images/main-wallpaper.png') center center / cover no-repeat;
}
```

## Color Conversion Tools

- **Hex to RGB**: Use online converters or CSS `rgb()` function
- **Opacity**: Add `rgba()` with alpha channel (0.0 to 1.0)
- **Gradients**: Use `linear-gradient()` with your color values
- **Darker/Lighter Shades**: Use tools like [Coolors](https://coolors.co/) or [Adobe Color](https://color.adobe.com/)

## Design Notes

- **Dark Mode Aesthetic**: The website uses a modern dark theme similar to VS Code Dark, GitHub Dark, or Discord
- **Purple Accent**: Vibrant purple (#a855f7) provides excellent contrast against dark backgrounds
- **Background Hierarchy**: Three levels of gray backgrounds create depth (main #121212, cards #1e1e1e, inputs #2a2a2a)
- **Text Hierarchy**: Three levels of text colors for content structure (primary #e5e5e5, secondary #b3b3b3, muted #888888)
- **Purple Glow**: Interactive elements use purple glow effect on hover for modern, engaging UI
- **Accessibility**: High contrast ratios ensure readability on dark backgrounds
