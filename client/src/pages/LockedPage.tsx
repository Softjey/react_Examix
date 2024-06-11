import { useState } from 'react';
import { Box, Fab, Stack, TextField, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/UI/buttons/Button';
import useAuth from '../hooks/queries/useAuth';
import { usePinCode } from '../store/contexts/PinCodeContext';
import SetPinCodeDialog from '../components/features/ChangePinCode/SetPinCodeDialog';
import {
  EnterPinCodeType,
  EnterPinCodeSchema,
} from '../components/features/ChangePinCode/PinCodeSchemas';
import ErrorSnackBar from '../components/UI/errors/ErrorSnackBar';

interface Props {}

const LockedPage: React.FC<Props> = () => {
  const { data: user } = useAuth();
  const userName = user?.name || 'User';
  const [open, setOpen] = useState<boolean>(false);
  const { unlock, unlockMutation } = usePinCode();
  const { error, isError, reset } = unlockMutation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterPinCodeType>({
    resolver: zodResolver(EnterPinCodeSchema),
    defaultValues: {
      pinCode: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    unlock(data.pinCode);
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Box
        onSubmit={onSubmit}
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h5">
          {userName}
        </Typography>

        <Stack
          sx={{ mb: 1, width: 270 }}
          display="flex"
          flexDirection="row"
          gap={1}
          alignItems="start"
          justifyContent="center"
        >
          <TextField
            autoComplete="off"
            sx={{
              flexGrow: 1,
            }}
            {...register('pinCode')}
            error={!!errors.pinCode}
            helperText={errors.pinCode?.message?.toString()}
            label="Pin-code"
            placeholder="Enter pin-code"
            size="small"
          />
          <Fab
            type="submit"
            sx={{ boxShadow: 'none', height: 38, width: 38 }}
            size="small"
            color="primary"
          >
            <ArrowForwardRoundedIcon />
          </Fab>
        </Stack>

        <Button onClick={() => setOpen(true)} size="small" color="primary">
          Forgot pin-code
        </Button>
      </Box>
      <SetPinCodeDialog resetMode open={open} onClose={() => setOpen(false)} />
      <ErrorSnackBar open={isError} errorMessage={error?.message} onClose={reset} />
    </Box>
  );
};

export default LockedPage;
