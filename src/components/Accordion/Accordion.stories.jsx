import { Accordion } from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

const defaultItems = [
  {
    title: 'What is a design token?',
    content: 'Design tokens are the single source of truth for design decisions — colors, spacing, typography, and more — stored as data and shared across platforms.',
  },
  {
    title: 'How does Style Dictionary work?',
    content: 'Style Dictionary reads your token JSON files, resolves references, applies platform-specific transforms, and outputs files (CSS, JS, Swift, etc.) that your products consume.',
  },
  {
    title: 'What themes are available?',
    content: 'This PoC ships with four brands — Wireframe, BCBS, HealthSpring, and Easify — each with a light and dark mode. All eight combinations are generated from the same token source.',
  },
];

export const Default = () => <Accordion items={defaultItems} />;

export const SingleItem = () => (
  <Accordion
    items={[
      {
        title: 'Expandable item',
        content: 'Click to expand and see the content.',
      },
    ]}
  />
);

export const DefaultOpen = () => (
  <Accordion
    items={[
      {
        title: 'This item is open by default',
        content: 'This accordion item starts in the expanded state.',
        defaultOpen: true,
      },
      {
        title: 'This item is closed by default',
        content: 'This accordion item starts in the collapsed state.',
        defaultOpen: false,
      },
    ]}
  />
);

export const ManyItems = () => (
  <Accordion
    items={[
      {
        title: 'First question',
        content: 'Answer to the first question goes here. You can include any HTML content.',
      },
      {
        title: 'Second question',
        content: 'Answer to the second question goes here.',
      },
      {
        title: 'Third question',
        content: 'Answer to the third question goes here.',
      },
      {
        title: 'Fourth question',
        content: 'Answer to the fourth question goes here.',
      },
      {
        title: 'Fifth question',
        content: 'Answer to the fifth question goes here.',
      },
    ]}
  />
);

export const LongContent = () => (
  <Accordion
    items={[
      {
        title: 'Item with long content',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      },
      {
        title: 'Another item',
        content: 'Short content',
      },
    ]}
  />
);
