import { Text } from './Text';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse', 'brand', 'success', 'warning', 'danger'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    mono: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

const Template = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'This is default text',
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: 'xs',
  children: 'Extra small text',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Small text',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
  children: 'Medium text',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Large text',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xl',
  children: 'Extra large text',
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Primary text',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Secondary text',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  color: 'tertiary',
  children: 'Tertiary text',
};

export const Brand = Template.bind({});
Brand.args = {
  color: 'brand',
  children: 'Brand colored text',
};

export const Success = Template.bind({});
Success.args = {
  color: 'success',
  children: 'Success text',
};

export const Warning = Template.bind({});
Warning.args = {
  color: 'warning',
  children: 'Warning text',
};

export const Danger = Template.bind({});
Danger.args = {
  color: 'danger',
  children: 'Danger text',
};

export const Regular = Template.bind({});
Regular.args = {
  weight: 'regular',
  children: 'Regular weight text',
};

export const Medium_Weight = Template.bind({});
Medium_Weight.args = {
  weight: 'medium',
  children: 'Medium weight text',
};

export const Semibold = Template.bind({});
Semibold.args = {
  weight: 'semibold',
  children: 'Semibold weight text',
};

export const Bold = Template.bind({});
Bold.args = {
  weight: 'bold',
  children: 'Bold weight text',
};

export const Monospace = Template.bind({});
Monospace.args = {
  mono: true,
  children: 'const greeting = "hello world";',
};

export const AllSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Text size="xs">Extra small (xs)</Text>
    <Text size="sm">Small (sm)</Text>
    <Text size="md">Medium (md)</Text>
    <Text size="lg">Large (lg)</Text>
    <Text size="xl">Extra large (xl)</Text>
  </div>
);

export const AllColors = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Text color="primary">Primary</Text>
    <Text color="secondary">Secondary</Text>
    <Text color="tertiary">Tertiary</Text>
    <Text color="brand">Brand</Text>
    <Text color="success">Success</Text>
    <Text color="warning">Warning</Text>
    <Text color="danger">Danger</Text>
  </div>
);

export const AllWeights = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Text weight="regular">Regular weight</Text>
    <Text weight="medium">Medium weight</Text>
    <Text weight="semibold">Semibold weight</Text>
    <Text weight="bold">Bold weight</Text>
  </div>
);
