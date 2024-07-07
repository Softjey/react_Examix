import { ThemeOptions } from '@mui/material';

const defaultThemeOptions: ThemeOptions = {
  components: {
    MuiTextField: {
      defaultProps: {
        SelectProps: {
          MenuProps: {
            disableScrollLock: true,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          backgroundColor: 'transparent',
          width: 12,
        },
      },
    },
  },
};

export default defaultThemeOptions;
