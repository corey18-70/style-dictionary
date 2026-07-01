import { useState } from 'react';
import { Notification } from './Notification';

export default {
  title: 'Components/Notification',
  component: Notification,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    title: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
  },
};

const Template = (args) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return <p>Notification dismissed</p>;
  }

  return <Notification {...args} onDismiss={() => setDismissed(true)} />;
};

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
  title: 'Heads up',
  message: 'Your session will expire in 30 minutes. Save your work to avoid losing changes.',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  title: 'Changes saved',
  message: 'Your design tokens were exported successfully to all target platforms.',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  title: 'Deprecated token',
  message: 'color.brand.accent is deprecated. Migrate to color.brand.default before the next major release.',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  title: 'Build failed',
  message: 'Style Dictionary encountered a broken reference: {color.primitive.unknown}.',
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  variant: 'info',
  title: 'Note',
};

export const MessageOnly = Template.bind({});
MessageOnly.args = {
  variant: 'success',
  message: 'Operation completed successfully.',
};

export const AllVariants = () => {
  const [dismissed, setDismissed] = useState({
    info: false,
    success: false,
    warning: false,
    danger: false,
  });

  const handleDismiss = (variant) => {
    setDismissed((d) => ({ ...d, [variant]: true }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {!dismissed.info && (
        <Notification
          variant="info"
          title="Information"
          message="This is an info notification."
          onDismiss={() => handleDismiss('info')}
        />
      )}
      {!dismissed.success && (
        <Notification
          variant="success"
          title="Success"
          message="This is a success notification."
          onDismiss={() => handleDismiss('success')}
        />
      )}
      {!dismissed.warning && (
        <Notification
          variant="warning"
          title="Warning"
          message="This is a warning notification."
          onDismiss={() => handleDismiss('warning')}
        />
      )}
      {!dismissed.danger && (
        <Notification
          variant="danger"
          title="Error"
          message="This is an error notification."
          onDismiss={() => handleDismiss('danger')}
        />
      )}
    </div>
  );
};
