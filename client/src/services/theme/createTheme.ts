import { createTheme as createMUITheme, ThemeOptions } from '@mui/material';
import deepMerge from '../../utils/deepMerge';
import defaultThemeOptions from './defaultThemeOptions';

export default function createTheme(themeOptions: ThemeOptions) {
  const options = deepMerge(
    defaultThemeOptions as Record<string, unknown>,
    themeOptions as Record<string, unknown>,
  );

  return createMUITheme(options);
}
