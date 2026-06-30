import styles from './Button.module.css';

const variants = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
};

const sizes = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={[
        styles.button,
        variants[variant] ?? styles.primary,
        sizes[size] ?? styles.md,
        disabled ? styles.disabled : '',
      ].join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
