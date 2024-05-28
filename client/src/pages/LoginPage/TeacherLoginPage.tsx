/* eslint-disable no-console */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useLogin from '../../hooks/queries/useLogin';
import LoginPage from './LoginPage';
import PasswordEyeButton from '../../components/UI/buttons/PasswordEyeButton';
import { Nullable } from '../../types/utils/Nullable';

const TeacherLoginShema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    /*
    // Later
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    )
    */
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Max length is 20'),
});

type LoginForm = z.infer<typeof TeacherLoginShema>;

const TeacherLoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<Nullable<Error>>(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const defaultValues: LoginForm = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(TeacherLoginShema),
    defaultValues,
    mode: 'onBlur',
  });

  const handleSnackBarClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  const onSubmit = handleSubmit((data) => {
    if (data.email && data.password) {
      setIsLoading(true);
      const { email, password } = data;

      loginMutation.mutate(
        { email, password },
        {
          // TODO: Add server errors handling (idk how)
          onError: (error) => {
            setServerError(error);
            setSnackBarOpen(true);
            console.log('error auth', error);
            setIsLoading(false);
          },
        },
      );
    }
  });

  return (
    <>
      <LoginPage
        firstFieldProps={{
          label: 'Email',
          placeholder: 'Enter email',
          variant: 'outlined',
          fullWidth: true,
          required: true,
          ...register('email'),
          error: !!errors.email,
          helperText: errors.email?.message,
          autoComplete: 'email',
        }}
        secondFieldProps={{
          label: 'Password',
          placeholder: 'Enter password',
          variant: 'outlined',
          type: showPassword ? 'text' : 'password',
          InputProps: {
            endAdornment: (
              <PasswordEyeButton
                disabled={isLoading}
                showPassword={showPassword}
                onClick={handleClickShowPassword}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              />
            ),
          },
          fullWidth: true,
          required: true,
          ...register('password'),
          error: !!errors.password,
          helperText: errors.password?.message,
          autoComplete: 'current-password',
        }}
        isLoading={isLoading}
        submitButtonText="Login"
        onSubmit={onSubmit}
      />
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message={serverError?.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackBarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default TeacherLoginPage;
