import { Dialog, Stack, Typography, TextField, Button, DialogProps } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { usePinCode } from '../../../store/contexts/PinCodeContext';
import ErrorSnackBar from '../../UI/errors/ErrorSnackBar';

interface Props extends Omit<DialogProps, 'onClose'> {
  resetMode?: boolean;
  onClose: () => void;
}

const SetPinCodeModal: React.FC<Props> = ({ onClose, resetMode, ...rest }) => {
  const { setPinCode, setPinMutation, checkPasswordMutation, pinCodeIsSet } = usePinCode();
  const error = checkPasswordMutation.error ?? setPinMutation.error;
  const isPending = checkPasswordMutation.isPending ?? setPinMutation.isPending;
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      pinCode: '',
      currentPassword: '',
    },
  });

  const onSubmit = handleSubmit(({ pinCode, currentPassword }) => {
    const newPinCode = resetMode ? null : pinCode;

    setPinCode(currentPassword, newPinCode, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  });

  const resetError = () => {
    checkPasswordMutation.reset();
    setPinMutation.reset();
  };

  return (
    <Dialog onClose={onClose} {...rest}>
      <Stack spacing={2} p="20px 30px" width={380} component="form" onSubmit={onSubmit}>
        <Typography variant="h5">{resetMode ? 'Reset pin code' : 'Set pin code'}</Typography>

        <TextField
          disabled={isPending}
          fullWidth
          autoFocus
          label="Enter Current Password"
          type="password"
          autoComplete="password"
          variant="outlined"
          {...register('currentPassword')}
        />

        {!pinCodeIsSet && !resetMode && (
          <TextField
            disabled={isPending}
            fullWidth
            label="Enter New PIN Code"
            variant="outlined"
            autoComplete="off"
            {...register('pinCode')}
          />
        )}

        <Button
          disabled={isPending}
          type="submit"
          variant="contained"
          color="primary"
          sx={{ alignSelf: 'center' }}
        >
          Confirm
        </Button>
      </Stack>

      <ErrorSnackBar open={!!error} onClose={resetError} errorMessage={error?.message} />
    </Dialog>
  );
};

export default SetPinCodeModal;
