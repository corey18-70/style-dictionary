import React from 'react';
import { BRANDS, MODES } from '../src/ThemeContext';

// Base primitive tokens
import '../src/tokens/base.css';
// Semantic theme tokens — one file per theme
import '../src/tokens/wireframe-light.css';
import '../src/tokens/wireframe-dark.css';
import '../src/tokens/bcbs-light.css';
import '../src/tokens/bcbs-dark.css';
import '../src/tokens/healthspring-light.css';
import '../src/tokens/healthspring-dark.css';
import '../src/tokens/easify-light.css';
import '../src/tokens/easify-dark.css';
// Global resets / base styles
import '../src/global.css';

const withTheme = (Story, context) => {
  const { brand, mode } = context.globals;

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', `${brand}-${mode}`);
  }, [brand, mode]);

  return (
    <div style={{ padding: '2rem' }}>
      <Story />
    </div>
  );
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Design system brand/theme',
      defaultValue: 'wireframe',
      toolbar: {
        icon: 'paintbrush',
        items: BRANDS.map((b) => ({ value: b.id, title: b.label })),
        dynamicTitle: true,
      },
    },
    mode: {
      name: 'Mode',
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        items: MODES.map((m) => ({ value: m.id, title: m.label })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
