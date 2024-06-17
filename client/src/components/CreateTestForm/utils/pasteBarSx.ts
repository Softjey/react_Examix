import { Theme } from '@mui/material';

const pasteBarSx = {
  content: '""',
  position: 'absolute',
  width: '100%',
  top: -13,
  height: '3px',
  backgroundColor: (theme: Theme) => theme.palette.info.main,
} as const;

export default pasteBarSx;
