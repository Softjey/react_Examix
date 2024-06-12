import { createTheme } from '@mui/material/styles';
import resetStyles from '../../styles/resetStyles';

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
        '::-webkit-scrollbar': {
          backgroundColor: 'transparent',
          width: resetStyles.scrollbar.width,
        },
        '::-webkit-scrollbar-thumb': { backgroundColor: dividerColor },
      },
    },
  },
});

export default darkTheme;
