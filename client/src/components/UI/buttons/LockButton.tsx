import React from 'react';
import { ButtonProps } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Button from './Button';
import { usePinCode } from '../../../store/contexts/PinCodeContext';

interface Props extends ButtonProps {}

const LockButton: React.FC<Props> = ({ ...rest }) => {
  const { lock, pinCodeIsSet } = usePinCode();

  return (
    <Button
      disabled={!pinCodeIsSet}
      title={pinCodeIsSet ? undefined : 'Set pin code first'}
      onClick={lock}
      variant="contained"
      color="primary"
      {...rest}
    >
      <LockIcon fontSize="medium" />
    </Button>
  );
};

export default LockButton;
