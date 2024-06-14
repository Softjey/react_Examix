import { useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/UI/buttons/Button';
import useAuth from '../hooks/queries/useAuth';
import { usePinCode } from '../store/contexts/PinCodeContext';
import SetPinCodeDialog from '../components/features/ChangePinCode/SetPinCodeDialog';
import { EnterPinCodeType } from '../components/features/ChangePinCode/PinCodeSchemas';
import { EnterPinCodeSchema } from '../components/features/ChangePinCode/PinCodeSchemas';
import ErrorSnackBar from '../components/UI/errors/ErrorSnackBar';
import QuizLayout from '../components/layouts/QuizLayout';

interface Props {}

const LockedPage: React.FC<Props> = () => {
  const { data: user } = useAuth();
  const userName = user?.name || 'User';
  const [open, setOpen] = useState<boolean>(false);
  const { unlock, unlockMutation } = usePinCode();
  const { error, isError, reset } = unlockMutation;
  const { register, handleSubmit, formState } = useForm<EnterPinCodeType>({
    resolver: zodResolver(EnterPinCodeSchema),
    defaultValues: { pinCode: '' },
  });
  const { errors } = formState;

  const onSubmit = handleSubmit((data) => {
    unlock(data.pinCode);
  });

  return (
    <QuizLayout centeredProps={{ width: 'fit-content' }}>
      <Stack alignItems="center" spacing={2} onSubmit={onSubmit} component="form" noValidate>
        <Typography variant="h5">{userName}</Typography>

        <Stack gap={1} width={270} flexDirection="row">
          <TextField
            aria-autocomplete="none"
            autoComplete="off"
            type="password"
            sx={{ flexGrow: 1 }}
            {...register('pinCode')}
            error={!!errors.pinCode}
            helperText={errors.pinCode?.message?.toString()}
            label="Pin-code"
            placeholder="Enter pin-code"
            size="small"
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ minWidth: 40, maxHeight: 40, paddingInline: 0 }}
          >
            <ArrowForwardRoundedIcon />
          </Button>
        </Stack>

        <Button onClick={() => setOpen(true)} size="small" color="primary">
          Forgot pin-code
        </Button>
      </Stack>
      <SetPinCodeDialog resetMode open={open} onClose={() => setOpen(false)} />
      <ErrorSnackBar open={isError} onClose={reset}>
        {error?.message}
      </ErrorSnackBar>
    </QuizLayout>
  );
};

export default LockedPage;
