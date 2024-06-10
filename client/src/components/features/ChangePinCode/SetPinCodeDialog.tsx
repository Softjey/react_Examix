import { Dialog, Stack, Typography, TextField, DialogProps } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePinCode } from '../../../store/contexts/PinCodeContext';
import ErrorSnackBar from '../../UI/errors/ErrorSnackBar';
import { getSetPinCodeSchema } from './PinCodeSchemas';
import Button from '../../UI/buttons/Button';

interface Props extends Omit<DialogProps, 'onClose'> {
  resetMode?: boolean;
  onClose: () => void;
}

const SetPinCodeDialog: React.FC<Props> = ({ onClose, resetMode = false, ...rest }) => {
  const { setPinCode, setPinMutation, checkPasswordMutation } = usePinCode();
  const error = checkPasswordMutation.error ?? setPinMutation.error;
  const isPending = checkPasswordMutation.isPending ?? setPinMutation.isPending;

  const SetPinCodeSchema = getSetPinCodeSchema(!!resetMode);

  type SetPinCodeType = z.infer<typeof SetPinCodeSchema>;

  const defaultValues = !resetMode
    ? {
        pinCode: '',
        currentPassword: '',
      }
    : {
        currentPassword: '',
      };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SetPinCodeType>({
    resolver: zodResolver(SetPinCodeSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    const newPinCode = 'pinCode' in data ? (data.pinCode as string) : null;
    const { currentPassword } = data;

    if (newPinCode === undefined) return;

    setPinCode(currentPassword, newPinCode, {
      onSuccess: () => {
        onClose();
      },
      onSettled: () => reset(),
    });
  });

  // eslint-disable-next-line no-console
  console.log(errors);

  const resetError = () => {
    checkPasswordMutation.reset();
    setPinMutation.reset();
  };

  return (
    <Dialog onClose={onClose} {...rest}>
      <Stack spacing={2} p="20px 30px" width={380} component="form" onSubmit={onSubmit}>
        <Typography variant="h5">{resetMode ? 'Reset pin code' : 'Set pin code'}</Typography>

        <TextField
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message?.toString()}
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
            // error={!!errors.pinCode}
            // helperText={errors.pinCode?.message?.toString()}
            disabled={isPending}
            fullWidth
            label="Enter New PIN Code"
            variant="outlined"
            autoComplete="off"
            // {...register('pinCode')}
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
