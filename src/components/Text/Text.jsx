import styles from './Text.module.css';

const sizeMap = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

const colorMap = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  tertiary: styles.colorTertiary,
  inverse: styles.colorInverse,
  brand: styles.colorBrand,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  danger: styles.colorDanger,
};

const weightMap = {
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
};

export function Text({
  children,
  as: Tag = 'p',
  size = 'md',
  color = 'primary',
  weight = 'regular',
  mono = false,
  className = '',
}) {
  return (
    <Tag
      className={[
        styles.text,
        sizeMap[size] ?? styles.md,
        colorMap[color] ?? styles.colorPrimary,
        weightMap[weight] ?? styles.weightRegular,
        mono ? styles.mono : '',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  );
}
