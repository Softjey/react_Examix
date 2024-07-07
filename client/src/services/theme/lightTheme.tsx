import createTheme from './createTheme';

const dividerColor = 'rgba(0, 0, 0, 0.12)';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    divider: dividerColor,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar-thumb': {
          backgroundColor: dividerColor,
        },
      },
    },
  },
});

export default lightTheme;
