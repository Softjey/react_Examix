import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import useLogin from '../../hooks/queries/useLogin';
import LoginForm from '../../components/forms/LoginForm';
import EyeButton from '../../components/UI/buttons/EyeButton';
import { Nullable } from '../../types/utils/Nullable';
import StartLayout from '../../components/layouts/StartLayout';

const LoginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Max length is 20'),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

const LoginPage: React.FC = () => {
  const { mutate, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<Nullable<string>>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const defaultValues: LoginFormType = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    if (data.email && data.password) {
      const { email, password } = data;

      mutate(
        { email, password },
        {
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              if (error.response?.data.statusCode === 401) {
                setServerErrorMessage('Invalid email or password');
              } else {
                setServerErrorMessage(error.response?.data.message);
              }
            } else {
              setServerErrorMessage(error.message);
            }
          },
        },
      );
    }
  });

  return (
    <StartLayout backBtn>
      <LoginForm
        firstFieldProps={{
          label: 'Email',
          placeholder: 'Enter email',
          variant: 'outlined',
          fullWidth: true,
          required: true,
          ...register('email'),
          error: !!errors.email || !!serverErrorMessage,
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
              <EyeButton
                aria-label="toggle password visibility"
                disabled={isPending}
                isEyeClosed={showPassword}
                onClick={handleClickShowPassword}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              />
            ),
          },
          fullWidth: true,
          required: true,
          ...register('password'),
          error: !!errors.password || !!serverErrorMessage,
          helperText: errors.password?.message,
          autoComplete: 'current-password',
        }}
        errorMessage={serverErrorMessage}
        onAlertClose={() => setServerErrorMessage(null)}
        isLoading={isPending}
        submitButtonText="Login"
        onSubmit={onSubmit}
      />
    </StartLayout>
  );
};

export default LoginPage;
