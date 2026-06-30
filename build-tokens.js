/**
 * build-tokens.js
 * Style Dictionary build script — multi-platform token output.
 *
 * Source tokens:
 *   tokens/base/*.json          — primitive palette (color, spacing, type, radius)
 *   tokens/themes/<theme>.json  — semantic tokens per theme
 *
 * Outputs (two passes each: base primitives + per-theme semantics):
 *
 *   src/tokens/           — React app (CSS custom props, themed selector)
 *   dist/web/css/         — CSS custom properties   (standard distribution)
 *   dist/web/scss/        — SCSS $variables
 *   dist/web/less/        — LESS @variables
 *   dist/web/js/          — JavaScript ES6 + CommonJS modules
 *   dist/android/         — Android XML resources   (colors only)
 *   dist/ios-swift/       — iOS Swift enums          (colors only)
 *
 * Android/iOS output is color-only — shadow and dimension tokens don't have
 * direct mobile equivalents and are excluded from those platforms.
 */

import StyleDictionary from 'style-dictionary';
import fs from 'fs';

// ─── Directory setup ──────────────────────────────────────────────────────────
const dirs = [
  'src/tokens',
  'dist/web/css/themes',
  'dist/web/scss/themes',
  'dist/web/less/themes',
  'dist/web/js',
  'dist/android/base',
  'dist/ios-swift/base',
  'dist/ios-swift/themes',
];
dirs.forEach((d) => fs.mkdirSync(d, { recursive: true }));

// ─── Custom format: selector-scoped CSS vars (used by the React app) ─────────
StyleDictionary.registerFormat({
  name: 'css/themed-variables',
  format: ({ dictionary, options }) => {
    const selector = options.selector || ':root';
    const vars = dictionary.allTokens
      .map((token) => `  --${token.name}: ${token.$value ?? token.value};`)
      .join('\n');
    return `${selector} {\n${vars}\n}\n`;
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Only emit tokens sourced from a specific theme file. */
const fromTheme = (theme) => (token) =>
  Boolean(token.filePath?.includes(`themes/${theme}`));

/** Only emit color tokens — for Android/iOS which have no shadow/dimension equivalents. */
const isColor = (token) =>
  (token.$type ?? token.type) === 'color';

/** Convert a theme slug to PascalCase class name, e.g. "default-light" → "DefaultLight". */
const toPascal = (slug) =>
  slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');

// ─── Base source files ────────────────────────────────────────────────────────
const BASE_SOURCES = [
  'tokens/base/color.json',
  'tokens/base/spacing.json',
  'tokens/base/typography.json',
  'tokens/base/radius.json',
];

// ─── PASS 1: Primitive base tokens ───────────────────────────────────────────
console.log('\n📦  Building base (primitive) tokens…');

const sdBase = new StyleDictionary({
  source: BASE_SOURCES,
  platforms: {

    // ── React app (internal) ─────────────────────────────────────────────────
    'app/css': {
      transformGroup: 'css',
      buildPath: 'src/tokens/',
      files: [{
        destination: 'base.css',
        format: 'css/themed-variables',
        options: { selector: ':root' },
      }],
    },

    // ── Web: CSS custom properties ───────────────────────────────────────────
    'dist/web/css': {
      transformGroup: 'css',
      buildPath: 'dist/web/css/',
      files: [{
        destination: 'base.css',
        format: 'css/variables',
        options: { showFileHeader: true },
      }],
    },

    // ── Web: SCSS $variables ─────────────────────────────────────────────────
    // sizes output in rem (scss transform group applies size/rem)
    'dist/web/scss': {
      transformGroup: 'scss',
      buildPath: 'dist/web/scss/',
      files: [{
        destination: '_base.scss',
        format: 'scss/variables',
        options: { showFileHeader: true },
      }],
    },

    // ── Web: LESS @variables ─────────────────────────────────────────────────
    'dist/web/less': {
      transformGroup: 'less',
      buildPath: 'dist/web/less/',
      files: [{
        destination: '_base.less',
        format: 'less/variables',
        options: { showFileHeader: true },
      }],
    },

    // ── Web: JavaScript modules ──────────────────────────────────────────────
    'dist/web/js': {
      transformGroup: 'js',
      buildPath: 'dist/web/js/',
      files: [
        {
          destination: 'base.esm.js',
          format: 'javascript/es6',
        },
        {
          destination: 'base.cjs.js',
          format: 'javascript/module',
        },
      ],
    },

    // ── Android XML resources (colors only) ──────────────────────────────────
    // Uses name/snake, color/hex8android transforms.
    // Dimension tokens are excluded — px → dp requires a custom transform
    // that will be added when native integration is required.
    'dist/android': {
      transformGroup: 'android',
      buildPath: 'dist/android/base/',
      files: [{
        destination: 'colors.xml',
        format: 'android/resources',
        filter: isColor,
        options: { showFileHeader: true },
      }],
    },

    // ── iOS Swift enum (colors only) ─────────────────────────────────────────
    // Uses name/camel, color/UIColorSwift transforms.
    'dist/ios-swift': {
      transformGroup: 'ios-swift',
      buildPath: 'dist/ios-swift/base/',
      files: [{
        destination: 'StyleDictionaryBase.swift',
        format: 'ios-swift/enum.swift',
        filter: isColor,
        options: {
          showFileHeader: true,
          className: 'StyleDictionaryBase',
        },
      }],
    },

  },
});

await sdBase.buildAllPlatforms();

// ─── PASS 2: Semantic theme tokens (one SD instance per theme) ────────────────
const themes = [
  'wireframe-light', 'wireframe-dark',
  'bcbs-light',      'bcbs-dark',
  'healthspring-light', 'healthspring-dark',
  'easify-light',    'easify-dark',
];

for (const theme of themes) {
  console.log(`\n🎨  Building theme: ${theme}…`);

  const themeFilter   = fromTheme(theme);
  const mobileFilter  = (token) => themeFilter(token) && isColor(token);
  const className     = `StyleDictionary${toPascal(theme)}`;

  const sd = new StyleDictionary({
    source: [...BASE_SOURCES, `tokens/themes/${theme}.json`],
    platforms: {

      // ── React app (internal, data-theme scoped) ───────────────────────────
      'app/css': {
        transformGroup: 'css',
        buildPath: 'src/tokens/',
        files: [{
          destination: `${theme}.css`,
          format: 'css/themed-variables',
          options: { selector: `[data-theme="${theme}"]` },
          filter: themeFilter,
        }],
      },

      // ── Web: CSS custom properties ─────────────────────────────────────────
      // Uses built-in css/variables format with selector override.
      'dist/web/css': {
        transformGroup: 'css',
        buildPath: 'dist/web/css/themes/',
        files: [{
          destination: `${theme}.css`,
          format: 'css/variables',
          options: {
            selector: `[data-theme="${theme}"]`,
            showFileHeader: true,
          },
          filter: themeFilter,
        }],
      },

      // ── Web: SCSS $variables ───────────────────────────────────────────────
      // Each theme outputs a standalone partial. Shadow token values pass
      // through as strings since scss/variables doesn't transform $type:shadow.
      'dist/web/scss': {
        transformGroup: 'scss',
        buildPath: 'dist/web/scss/themes/',
        files: [{
          destination: `_${theme}.scss`,
          format: 'scss/variables',
          options: { showFileHeader: true },
          filter: themeFilter,
        }],
      },

      // ── Web: LESS @variables ───────────────────────────────────────────────
      'dist/web/less': {
        transformGroup: 'less',
        buildPath: 'dist/web/less/themes/',
        files: [{
          destination: `_${theme}.less`,
          format: 'less/variables',
          options: { showFileHeader: true },
          filter: themeFilter,
        }],
      },

      // ── Web: JavaScript ES6 module ─────────────────────────────────────────
      'dist/web/js': {
        transformGroup: 'js',
        buildPath: 'dist/web/js/',
        files: [{
          destination: `${theme}.esm.js`,
          format: 'javascript/es6',
          filter: themeFilter,
        }],
      },

      // ── Android XML resources (colors only) ────────────────────────────────
      'dist/android': {
        transformGroup: 'android',
        buildPath: `dist/android/themes/${theme}/`,
        files: [{
          destination: 'colors.xml',
          format: 'android/resources',
          filter: mobileFilter,
          options: { showFileHeader: true },
        }],
      },

      // ── iOS Swift enum (colors only) ───────────────────────────────────────
      'dist/ios-swift': {
        transformGroup: 'ios-swift',
        buildPath: 'dist/ios-swift/themes/',
        files: [{
          destination: `${className}.swift`,
          format: 'ios-swift/enum.swift',
          filter: mobileFilter,
          options: {
            showFileHeader: true,
            className,
          },
        }],
      },

    },
  });

  await sd.buildAllPlatforms();
}

console.log('\n✅  Token build complete!\n');
console.log('Outputs:');
console.log('  src/tokens/          React app CSS (themed selectors)');
console.log('  dist/web/css/        CSS custom properties');
console.log('  dist/web/scss/       SCSS $variables');
console.log('  dist/web/less/       LESS @variables');
console.log('  dist/web/js/         JavaScript ES6 + CommonJS');
console.log('  dist/android/        Android XML resources (colors)');
console.log('  dist/ios-swift/      iOS Swift enums (colors)\n');
