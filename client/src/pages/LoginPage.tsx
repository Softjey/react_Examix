import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import useLogin from '../hooks/queries/useLogin';
import LoginForm from '../components/forms/LoginForm';
import EyeButton from '../components/UI/buttons/EyeButton';
import StartLayout from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import ResetPasswordModal from '../components/ResetPasswordModal';

const LoginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Max length is 20'),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

const LoginPage: React.FC = () => {
  const { mutate, isPending, reset, error: serverError, isError } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [isModalOpened, setIsModalOpened] = useState(false);

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

      mutate({ email, password });
    }
  });

  return (
    <StartLayout backBtn>
      <LoginForm
        firstFieldProps={{
          label: 'Email',
          placeholder: 'Enter email',
          type: 'email',
          required: true,
          ...register('email'),
          error: !!errors.email || isError,
          helperText: errors.email?.message,
          autoComplete: 'email',
        }}
        secondFieldProps={{
          label: 'Password',
          placeholder: 'Enter password',
          type: showPassword ? 'text' : 'password',
          required: true,
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
          ...register('password'),
          error: !!errors.password || isError,
          helperText: errors.password?.message,
          autoComplete: 'current-password',
        }}
        errorMessage={serverError ? serverError.message : null}
        onErrorClose={() => reset()}
        isLoading={isPending}
        submitButtonText="Login"
        onSubmit={onSubmit}
      />

      <Button size="small" onClick={() => setIsModalOpened(true)}>
        Forgot password
      </Button>
      <ResetPasswordModal open={isModalOpened} onClose={() => setIsModalOpened(false)} />
    </StartLayout>
  );
};

export default LoginPage;
