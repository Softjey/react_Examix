import { TypographyProps } from '@mui/material';

const SIZE_MAP: {
  [key in NonNullable<TypographyProps['variant']>]: number;
} = {
  h1: 80,
  h2: 48,
  h3: 36,
  h4: 28,
  h5: 22,
  h6: 20,
  subtitle1: 18,
  subtitle2: 16,
  body1: 16,
  body2: 14,
  caption: 14,
  button: 16,
  inherit: 14,
  overline: 12,
};

export default function getIconSizeByTypographyVariant(
  variant: NonNullable<TypographyProps['variant']>,
): number {
  if (!variant) {
    return 14;
  }

  return SIZE_MAP[variant];
}
