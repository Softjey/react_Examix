/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useLogin from '../../hooks/queries/useLogin';
import LoginPage, { LoginForm } from './LoginPage';
import PasswordEyeButton from '../../components/UI/buttons/PasswordEyeButton';

const TeacherLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const loginMutation = useLogin();

  const defaultValues: LoginForm<'email', 'password'> = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm<'email', 'password'>>({ defaultValues, mode: 'onBlur' });

  console.log(errors);
  console.log(watch());

  const onSubmit = handleSubmit((data) => {
    if (data.email && data.password) {
      const { email, password } = data;

      loginMutation.mutate(
        { email, password },
        {
          // TODO: Add error handling
          onError: (error) => {
            console.log('error auth', error);
          },
        },
      );
    }
  });

  return (
    <LoginPage
      firstFieldProps={{
        label: 'Email',
        placeholder: 'Enter email',
        variant: 'outlined',
        fullWidth: true,
        required: true,
        ...register('email', { required: { value: true, message: 'Email is required' } }),
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
              showPassword={showPassword}
              onClick={handleClickShowPassword}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            />
          ),
        },
        fullWidth: true,
        required: true,
        ...register('password', { required: { value: true, message: 'Password is required' } }),
        error: !!errors.password,
        helperText: errors.password?.message,
        autoComplete: 'current-password',
      }}
      submitButtonText="Login"
      onSubmit={onSubmit}
    />
  );
};

export default TeacherLoginPage;
