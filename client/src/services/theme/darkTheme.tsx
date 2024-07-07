import createTheme from './createTheme';

const dividerColor = '#474747';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#4965e4',
      contrastText: '#ffffff',
    },
    divider: dividerColor,
    primary: {
      main: '#AD19D5',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar-thumb': {
          backgroundColor: dividerColor,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        SelectProps: {
          MenuProps: {
            disableScrollLock: true,
          },
        },
      },
    },
  },
});

export default darkTheme;
