import { useState } from 'react';
import { useTheme, BRANDS, MODES } from './ThemeContext';
import { Button } from './components/Button/Button';
import { Accordion } from './components/Accordion/Accordion';
import { Text } from './components/Text/Text';
import { Heading } from './components/Heading/Heading';
import { Notification } from './components/Notification/Notification';
import styles from './App.module.css';

const accordionItems = [
  {
    title: 'What is a design token?',
    defaultOpen: true,
    content:
      'Design tokens are the single source of truth for design decisions — colors, spacing, typography, and more — stored as data and shared across platforms.',
  },
  {
    title: 'How does Style Dictionary work?',
    content:
      'Style Dictionary reads your token JSON files, resolves references, applies platform-specific transforms, and outputs files (CSS, JS, Swift, etc.) that your products consume.',
  },
  {
    title: 'What themes are available?',
    content:
      'This PoC ships with two brands — Default (blue) and Ocean (teal) — each with a light and dark mode. All four combinations are generated from the same token source.',
  },
];

function ThemeSwitcher() {
  const { brand, setBrand, mode, setMode } = useTheme();

  return (
    <div className={styles.switcher}>
      <div className={styles.switcherGroup}>
        <Text size="xs" color="secondary" weight="medium">Brand</Text>
        <div className={styles.pills}>
          {BRANDS.map((b) => (
            <button
              key={b.id}
              className={`${styles.pill} ${brand === b.id ? styles.pillActive : ''}`}
              onClick={() => setBrand(b.id)}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.switcherGroup}>
        <Text size="xs" color="secondary" weight="medium">Mode</Text>
        <div className={styles.pills}>
          {MODES.map((m) => (
            <button
              key={m.id}
              className={`${styles.pill} ${mode === m.id ? styles.pillActive : ''}`}
              onClick={() => setMode(m.id)}
            >
              {m.id === 'light' ? '☀️ Light' : '🌙 Dark'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [notifications, setNotifications] = useState({
    info: true,
    success: true,
    warning: true,
    danger: true,
  });

  const dismiss = (key) => setNotifications((n) => ({ ...n, [key]: false }));
  const reset   = () => setNotifications({ info: true, success: true, warning: true, danger: true });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <Heading level={4} color="brand">Design System PoC</Heading>
            <Text size="sm" color="secondary">Tokens · Components · Themes</Text>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <main className={styles.main}>

        {/* ── Headings ─────────────────────────────────────────── */}
        <section className={styles.section}>
          <Text size="xs" color="tertiary" weight="semibold" className={styles.sectionLabel}>HEADINGS</Text>
          <div className={styles.stack}>
            <Heading level={1}>Heading 1 — Display</Heading>
            <Heading level={2}>Heading 2 — Title</Heading>
            <Heading level={3}>Heading 3 — Section</Heading>
            <Heading level={4}>Heading 4 — Subsection</Heading>
            <Heading level={5}>Heading 5 — Label</Heading>
            <Heading level={6}>Heading 6 — Caption</Heading>
          </div>
        </section>

        {/* ── Text ─────────────────────────────────────────────── */}
        <section className={styles.section}>
          <Text size="xs" color="tertiary" weight="semibold" className={styles.sectionLabel}>TEXT</Text>
          <div className={styles.stack}>
            <Text size="xl" weight="semibold">Extra large, semibold</Text>
            <Text size="lg">Large body text — comfortable for reading long passages of content.</Text>
            <Text size="md">Medium body text — the default size for most UI contexts.</Text>
            <Text size="sm" color="secondary">Small secondary text — used for captions, labels, and supporting copy.</Text>
            <Text size="xs" color="tertiary">Extra small tertiary text — metadata and fine print.</Text>
            <Text size="md" color="brand" weight="medium">Brand-colored text with medium weight.</Text>
            <Text size="md" mono>Monospace text for code and technical content.</Text>
          </div>
        </section>

        {/* ── Buttons ──────────────────────────────────────────── */}
        <section className={styles.section}>
          <Text size="xs" color="tertiary" weight="semibold" className={styles.sectionLabel}>BUTTONS</Text>

          <div className={styles.subSection}>
            <Text size="xs" color="secondary" weight="medium">Variants</Text>
            <div className={styles.row}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          <div className={styles.subSection}>
            <Text size="xs" color="secondary" weight="medium">Sizes</Text>
            <div className={styles.row} style={{ alignItems: 'center' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </section>

        {/* ── Notifications ────────────────────────────────────── */}
        <section className={styles.section}>
          <Text size="xs" color="tertiary" weight="semibold" className={styles.sectionLabel}>NOTIFICATIONS</Text>
          <div className={styles.stack}>
            {notifications.info && (
              <Notification
                variant="info"
                title="Heads up"
                message="Your session will expire in 30 minutes. Save your work to avoid losing changes."
                onDismiss={() => dismiss('info')}
              />
            )}
            {notifications.success && (
              <Notification
                variant="success"
                title="Changes saved"
                message="Your design tokens were exported successfully to all target platforms."
                onDismiss={() => dismiss('success')}
              />
            )}
            {notifications.warning && (
              <Notification
                variant="warning"
                title="Deprecated token"
                message="color.brand.accent is deprecated. Migrate to color.brand.default before the next major release."
                onDismiss={() => dismiss('warning')}
              />
            )}
            {notifications.danger && (
              <Notification
                variant="danger"
                title="Build failed"
                message="Style Dictionary encountered a broken reference: {color.primitive.unknown}."
                onDismiss={() => dismiss('danger')}
              />
            )}
            {!Object.values(notifications).some(Boolean) && (
              <div className={styles.empty}>
                <Text size="sm" color="secondary">All notifications dismissed.</Text>
                <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>
              </div>
            )}
          </div>
        </section>

        {/* ── Accordion ────────────────────────────────────────── */}
        <section className={styles.section}>
          <Text size="xs" color="tertiary" weight="semibold" className={styles.sectionLabel}>ACCORDION</Text>
          <Accordion items={accordionItems} />
        </section>

      </main>
    </div>
  );
}
