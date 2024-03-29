import { ButtonProps, styled } from '@mui/material';
import Button from './Button';

const MainButton = styled(Button)<ButtonProps>(() => ({
  width: 200,
  height: 50,
  fontSize: '1rem',
}));

export default MainButton;
