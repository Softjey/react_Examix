/* eslint-disable no-console */
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginForm from '../components/forms/LoginForm';
import EyeButton from '../components/UI/buttons/EyeButton';

const ChangePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Max length is 20'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

const defaultValues: ChangePasswordType = {
  newPassword: '',
  confirmPassword: '',
};

interface Props {}

const ChangePasswordPage: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({ resolver: zodResolver(ChangePasswordSchema), defaultValues });

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    setTimeout(() => {
      console.log(data);
      setLoading(false);
    }, 2000);
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ mb: 2 }} variant="h2">
        Change account password
      </Typography>
      <Typography sx={{ mb: 5 }} fontWeight="300" color="text.secondary" variant="h6">
        Enter a new password for Examix
      </Typography>

      <LoginForm
        firstFieldProps={{
          label: 'Password',
          placeholder: 'Please enter new password',
          type: showPassword ? 'text' : 'password',
          required: true,
          InputProps: {
            endAdornment: (
              <EyeButton
                aria-label="toggle password visibility"
                disabled={loading}
                isEyeClosed={showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              />
            ),
          },
          ...register('newPassword'),
          error: !!errors.newPassword, // || isError,
          helperText: errors.newPassword?.message,
          autoComplete: 'new-password',
        }}
        secondFieldProps={{
          label: 'Confirm password',
          placeholder: 'Please confirm new password',
          type: showConfirmPassword ? 'text' : 'password',
          required: true,
          InputProps: {
            endAdornment: (
              <EyeButton
                aria-label="toggle password visibility"
                disabled={loading}
                isEyeClosed={showConfirmPassword}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              />
            ),
          },
          ...register('confirmPassword'),
          error: !!errors.confirmPassword, // || isError,
          helperText: errors.confirmPassword?.message,
          autoComplete: 'new-password',
        }}
        errorMessage={null}
        onErrorClose={() => {}}
        isLoading={loading}
        submitButtonText="Change password"
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default ChangePasswordPage;
