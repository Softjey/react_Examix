import { Box, Fab, Stack, TextField, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/UI/buttons/Button';
import useAuth from '../hooks/queries/useAuth';
// import ErrorSnackBar from '../components/UI/errors/ErrorSnackBar';

interface Props {}

const LockedSchema = z.object({
  pinCode: z
    .string()
    .min(0, 'Pin-code is required')
    .regex(/^[0-9]+$/, 'Pin-code must contain only digits')
    .min(4, 'Code length must be at least 4')
    .max(8, 'Maximum length is 8'),
});

type LockedType = z.infer<typeof LockedSchema>;

const LockedPage: React.FC<Props> = () => {
  const { data: user } = useAuth();
  const userName = user?.name || 'User';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LockedType>({
    resolver: zodResolver(LockedSchema),
    defaultValues: {
      pinCode: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
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

        <Button size="small" color="primary">
          Forgot pin-code
        </Button>
      </Box>

      {/* <ErrorSnackBar open={isError} errorMessage={error?.message} onClose={() => reset()} /> */}
    </Box>
  );
};

export default LockedPage;
