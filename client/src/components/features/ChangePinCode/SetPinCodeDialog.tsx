import { Dialog, Stack, Typography, TextField, DialogProps } from '@mui/material';
import React from 'react';
import ErrorSnackBar from '../../UI/errors/ErrorSnackBar';
import Button from '../../UI/buttons/Button';
import useSetPinCodeDialog from './useSetPinCodeDialog';

interface Props extends Omit<DialogProps, 'onClose'> {
  resetMode?: boolean;
  onClose: () => void;
}

const SetPinCodeDialog: React.FC<Props> = ({ onClose, resetMode = false, ...rest }) => {
  const { form, query } = useSetPinCodeDialog({ onClose, resetMode });
  const { isPending, error, resetError } = query;
  const { validationErrors, register, onSubmit } = form;

  return (
    <Dialog onClose={onClose} {...rest}>
      <Stack spacing={2} p="20px 30px" width={380} component="form" onSubmit={onSubmit}>
        <Typography variant="h5">{resetMode ? 'Reset pin code' : 'Set pin code'}</Typography>

        <TextField
          error={!!validationErrors.currentPassword?.message}
          helperText={validationErrors.currentPassword?.message}
          disabled={isPending}
          fullWidth
          autoFocus
          label="Enter Current Password"
          type="password"
          autoComplete="password"
          variant="outlined"
          {...register('currentPassword')}
        />

        {!resetMode && (
          <TextField
            error={!!validationErrors.pinCode}
            helperText={validationErrors.pinCode?.message}
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

export default SetPinCodeDialog;
