# Design System PoC

A proof-of-concept design system built with React, Vite, and Style Dictionary. It demonstrates a multi-theme token architecture with live theme switching across two brands and two modes.

---

## Quick Start

```bash
npm install
npm run dev
```

`npm run dev` runs the Style Dictionary token build first, then starts the Vite dev server. Open [http://localhost:5173](http://localhost:5173) to see the component showcase with the theme switcher.

---

## How It Works

Tokens flow through three layers: **primitives → semantics → components**.

```
tokens/base/          (primitives)
      ↓
tokens/themes/        (semantics — resolved per theme)
      ↓
Style Dictionary      (outputs CSS custom properties)
      ↓
src/tokens/*.css      (consumed by React components)
```

### 1. Primitive Tokens (`tokens/base/`)

The raw design vocabulary. These are theme-agnostic values that form the palette everything else references.

| File | Contents |
|---|---|
| `color.json` | Full color palette — gray, blue, indigo, teal, emerald, green, yellow, red (each with 9–12 shades) |
| `spacing.json` | 4px-base spacing scale (0–96px) |
| `typography.json` | Font families, sizes (xs–5xl), weights, line heights, letter spacing |
| `radius.json` | Border radius scale (none, sm, md, lg, xl, 2xl, full) |

These are output to `src/tokens/base.css` on `:root` as CSS custom properties like `--color-primitive-blue-500`, `--spacing-4`, `--font-size-md`, `--radius-lg`.

### 2. Semantic Tokens (`tokens/themes/`)

One JSON file per theme. Each file maps semantic intent to primitive values using Style Dictionary's reference syntax (`{color.primitive.blue.500}`).

| File | Theme |
|---|---|
| `default-light.json` | Default brand, light mode |
| `default-dark.json` | Default brand, dark mode |
| `ocean-light.json` | Ocean brand (teal), light mode |
| `ocean-dark.json` | Ocean brand (teal), dark mode |

Each theme defines the full semantic token set:

| Category | Tokens | Purpose |
|---|---|---|
| `surface.*` | page, section, card, raised, overlay, scrim, inverse, accent, info, success, warning, danger, action, subtle | Background layers |
| `on-surface.*` | primary, secondary, subtle, disabled, inverse, icon, icon-subtle, link, link-hover, link-active, focus | Text and icon colors |
| `border.*` | default, subtle, strong, inverse, disabled, control, focus, info, success, warning, danger | Border colors |
| `interactive.primary.*` | surface, on-surface, border × default/hover/active/disabled | Primary CTA (filled) |
| `interactive.secondary.*` | surface, on-surface, border × default/hover/active/disabled | Secondary CTA (outlined) |
| `interactive.tertiary.*` | surface, on-surface, border × default/hover/active/disabled | Ghost/text CTA |
| `interactive.neutral.*` | background, border, on × default/hover/active | Neutral interactive states |
| `field.*` | background, border, text, placeholder, icon, selection × states | Form input styles |
| `status.*` | surface, on-surface, border, icon × info/success/warning/danger | Feedback states |
| `overlay.*` | scrim, shadow-1/2/3, popover-caret, scroll-track, scroll-thumb | Elevation and overlays |
| `brand.*` | primary, accent-1 through accent-6 | Brand accent palette |
| `font-family-*` | serif, sans-serif | Semantic font family aliases |

Style Dictionary resolves all `{...}` references and outputs each theme as a scoped CSS file like:

```css
[data-theme="default-light"] {
  --surface-page: #f9fafb;
  --on-surface-primary: #111827;
  --brand-primary: #3b82f6;
  --interactive-primary-surface-default: #3b82f6;
  /* ... */
}
```

### 3. The Build Script (`build-tokens.js`)

Runs two Style Dictionary passes:

1. **Base pass** — processes `tokens/base/*.json`, outputs `src/tokens/base.css` scoped to `:root`.
2. **Theme pass** — for each theme, processes base files + the theme file together (so references resolve), filters to only emit tokens sourced from the theme file, outputs `src/tokens/<theme>.css` scoped to `[data-theme="<theme>"]`.

A custom `css/themed-variables` format handles the selector scoping. Shadow tokens (`$type: "shadow"`) pass through as raw CSS strings since they hold `box-shadow` values.

### 4. Theme Switching

`ThemeContext.jsx` manages brand (`default` | `ocean`) and mode (`light` | `dark`) state. When either changes, it sets `data-theme` on `<html>`:

```jsx
document.documentElement.setAttribute('data-theme', `${brand}-${mode}`);
```

Because the semantic CSS files are already loaded and scoped to `[data-theme="..."]` selectors, the entire UI re-themes instantly — no JS re-renders required beyond the context update.

---

## Project Structure

```
├── build-tokens.js          # Style Dictionary build script
├── vite.config.js
├── index.html
│
├── tokens/
│   ├── base/
│   │   ├── color.json       # Primitive color palette
│   │   ├── spacing.json     # Spacing scale
│   │   ├── typography.json  # Font sizes, weights, families
│   │   └── radius.json      # Border radius scale
│   └── themes/
│       ├── default-light.json
│       ├── default-dark.json
│       ├── ocean-light.json
│       └── ocean-dark.json
│
└── src/
    ├── main.jsx             # Entry — imports all token CSS + mounts app
    ├── global.css           # CSS reset + fallback token values
    ├── ThemeContext.jsx      # Theme state + data-theme setter
    ├── App.jsx              # Component showcase + theme switcher UI
    ├── App.module.css
    │
    ├── tokens/              # Generated by Style Dictionary (git-ignored)
    │   ├── base.css
    │   ├── default-light.css
    │   ├── default-dark.css
    │   ├── ocean-light.css
    │   └── ocean-dark.css
    │
    └── components/
        ├── Button/
        │   ├── Button.jsx
        │   └── Button.module.css
        ├── Accordion/
        │   ├── Accordion.jsx
        │   └── Accordion.module.css
        ├── Text/
        │   ├── Text.jsx
        │   └── Text.module.css
        ├── Heading/
        │   ├── Heading.jsx
        │   └── Heading.module.css
        └── Notification/
            ├── Notification.jsx
            └── Notification.module.css
```

---

## Components

All components consume semantic tokens only — no hardcoded colors, no primitive token references.

### Button

```jsx
<Button variant="primary" size="md">Label</Button>
```

| Prop | Options | Default |
|---|---|---|
| `variant` | `primary` `secondary` `ghost` `danger` | `primary` |
| `size` | `sm` `md` `lg` | `md` |
| `disabled` | `boolean` | `false` |

Maps to `interactive.primary.*`, `interactive.secondary.*`, and `interactive.tertiary.*` tokens.

### Heading

```jsx
<Heading level={2} color="brand">Section Title</Heading>
```

| Prop | Options | Default |
|---|---|---|
| `level` | `1`–`6` | `2` |
| `color` | `primary` `secondary` `brand` `inverse` | `primary` |
| `as` | any HTML tag | derived from `level` |

### Text

```jsx
<Text size="sm" color="secondary" weight="medium">Body copy</Text>
```

| Prop | Options | Default |
|---|---|---|
| `size` | `xs` `sm` `md` `lg` `xl` | `md` |
| `color` | `primary` `secondary` `tertiary` `inverse` `brand` `success` `warning` `danger` | `primary` |
| `weight` | `regular` `medium` `semibold` `bold` | `regular` |
| `mono` | `boolean` | `false` |
| `as` | any HTML tag | `p` |

### Accordion

```jsx
<Accordion items={[
  { title: 'Question', content: 'Answer', defaultOpen: true }
]} />
```

Accepts an array of `{ title, content, defaultOpen? }` items. Each item manages its own open/closed state independently.

### Notification

```jsx
<Notification
  variant="success"
  title="Saved"
  message="Your changes were published."
  onDismiss={() => {}}
/>
```

| Prop | Options |
|---|---|
| `variant` | `info` `success` `warning` `danger` |
| `title` | string (optional) |
| `message` | string (optional) |
| `onDismiss` | function — renders dismiss button when provided |

Maps to `status.*` tokens.

---

## Adding a New Theme

1. Create `tokens/themes/<brand>-<mode>.json` following the same token structure as an existing theme.
2. Add the theme name to the `themes` array in `build-tokens.js`.
3. Add the generated CSS import to `src/main.jsx`.
4. Add the brand/mode option to `BRANDS` or `MODES` in `ThemeContext.jsx`.

## Adding a New Token

1. Add the value to the appropriate `tokens/base/*.json` file (primitives) or directly in each theme file (semantic).
2. Run `npm run build:tokens` to regenerate the CSS.
3. Reference the token in component CSS as `var(--<token-name>)`.

---

## Output Platforms

`build-tokens.js` runs Style Dictionary in two passes (base primitives + per-theme semantics) and produces output for every platform in a single command.

```
dist/
├── web/
│   ├── css/
│   │   ├── base.css              # :root { --color-primitive-blue-500: … }
│   │   └── themes/
│   │       ├── default-light.css # [data-theme="default-light"] { --surface-page: … }
│   │       ├── default-dark.css
│   │       ├── ocean-light.css
│   │       └── ocean-dark.css
│   ├── scss/
│   │   ├── _base.scss            # $color-primitive-blue-500: …  (rem units)
│   │   └── themes/
│   │       ├── _default-light.scss
│   │       └── …
│   ├── less/
│   │   ├── _base.less            # @color-primitive-blue-500: …
│   │   └── themes/
│   │       └── …
│   └── js/
│       ├── base.esm.js           # export const ColorPrimitiveBlue500 = '…'
│       ├── base.cjs.js           # module.exports = { … }
│       └── <theme>.esm.js        # one ES6 file per theme
├── android/
│   ├── base/
│   │   └── colors.xml            # <color name="color_primitive_blue_500">#ff3b82f6</color>
│   └── themes/
│       └── <theme>/
│           └── colors.xml        # semantic colors in Android hex8 format
└── ios-swift/
    ├── base/
    │   └── StyleDictionaryBase.swift
    └── themes/
        └── StyleDictionary<Theme>.swift
```

**Platform notes:**

- **CSS / SCSS / LESS** — all tokens (color, spacing, typography, radius, shadow strings). SCSS and LESS sizes output in `rem` (Style Dictionary's `size/rem` transform).
- **JavaScript** — ES6 named exports (`base.esm.js`) and CommonJS (`base.cjs.js`) for the primitive layer; one ESM file per theme for semantic tokens.
- **Android** — color tokens only, using Android's `hex8` ARGB format (`#aarrggbb`). Shadow and dimension tokens are excluded; px → dp conversion will be added as a custom transform when native integration is needed.
- **iOS Swift** — color tokens only, output as `UIColor` values inside a Swift `enum`. One class per theme for easy import alongside the base class.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Build tokens then start Vite dev server |
| `npm run build` | Build tokens then build for production |
| `npm run build:tokens` | Run Style Dictionary only (all platforms) |
| `npm run preview` | Preview the production build |
