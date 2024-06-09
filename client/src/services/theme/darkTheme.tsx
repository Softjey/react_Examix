import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#4965e4',
      contrastText: '#ffffff',
    },
    primary: {
      main: '#AD19D5',
    },
  },
});

export default darkTheme;
