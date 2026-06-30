import styles from './Heading.module.css';

const levelMap = {
  1: { tag: 'h1', cls: styles.h1 },
  2: { tag: 'h2', cls: styles.h2 },
  3: { tag: 'h3', cls: styles.h3 },
  4: { tag: 'h4', cls: styles.h4 },
  5: { tag: 'h5', cls: styles.h5 },
  6: { tag: 'h6', cls: styles.h6 },
};

const colorMap = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  brand: styles.colorBrand,
  inverse: styles.colorInverse,
};

export function Heading({
  children,
  level = 2,
  as,
  color = 'primary',
  className = '',
}) {
  const { tag: DefaultTag, cls } = levelMap[level] ?? levelMap[2];
  const Tag = as || DefaultTag;

  return (
    <Tag
      className={[
        styles.heading,
        cls,
        colorMap[color] ?? styles.colorPrimary,
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  );
}
