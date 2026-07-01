import { Heading } from './Heading';

export default {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'brand', 'inverse'],
    },
    children: {
      control: 'text',
    },
  },
};

const Template = (args) => <Heading {...args} />;

export const Level1 = Template.bind({});
Level1.args = {
  level: 1,
  children: 'Heading 1 — Display',
};

export const Level2 = Template.bind({});
Level2.args = {
  level: 2,
  children: 'Heading 2 — Title',
};

export const Level3 = Template.bind({});
Level3.args = {
  level: 3,
  children: 'Heading 3 — Section',
};

export const Level4 = Template.bind({});
Level4.args = {
  level: 4,
  children: 'Heading 4 — Subsection',
};

export const Level5 = Template.bind({});
Level5.args = {
  level: 5,
  children: 'Heading 5 — Label',
};

export const Level6 = Template.bind({});
Level6.args = {
  level: 6,
  children: 'Heading 6 — Caption',
};

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  level: 2,
  color: 'primary',
  children: 'Primary heading',
};

export const SecondaryColor = Template.bind({});
SecondaryColor.args = {
  level: 2,
  color: 'secondary',
  children: 'Secondary heading',
};

export const BrandColor = Template.bind({});
BrandColor.args = {
  level: 2,
  color: 'brand',
  children: 'Brand heading',
};

export const AllLevels = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Heading level={1}>Heading 1 — Display</Heading>
    <Heading level={2}>Heading 2 — Title</Heading>
    <Heading level={3}>Heading 3 — Section</Heading>
    <Heading level={4}>Heading 4 — Subsection</Heading>
    <Heading level={5}>Heading 5 — Label</Heading>
    <Heading level={6}>Heading 6 — Caption</Heading>
  </div>
);

export const AllColors = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Heading level={2} color="primary">Primary heading</Heading>
    <Heading level={2} color="secondary">Secondary heading</Heading>
    <Heading level={2} color="brand">Brand heading</Heading>
  </div>
);
