import { createTheme } from '@mui/material/styles';
import resetStyles from '../../styles/resetStyles';

const dividerColor = 'rgba(0, 0, 0, 0.12)';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    divider: dividerColor,
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

export default lightTheme;
