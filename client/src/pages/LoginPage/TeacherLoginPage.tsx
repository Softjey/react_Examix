import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import axios, { AxiosResponse } from 'axios';
import useLogin from '../../hooks/queries/useLogin';
import LoginForm from '../../components/forms/LoginForm';
import EyeButton from '../../components/UI/buttons/EyeButton';
import { Nullable } from '../../types/utils/Nullable';
import StartLayout from '../../components/layouts/StartLayout';

const TeacherLoginShema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Max length is 20'),
});

type LoginFormType = z.infer<typeof TeacherLoginShema>;

const TeacherLoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<Nullable<AxiosResponse>>(null);

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
    resolver: zodResolver(TeacherLoginShema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    if (data.email && data.password) {
      setIsLoading(true);
      const { email, password } = data;

      try {
        await loginMutation.mutateAsync(
          { email, password },
          {
            onError: (error) => {
              if (axios.isAxiosError(error)) {
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw error.response;
              } else {
                throw error;
              }
            },
          },
        );
      } catch (error) {
        setServerError(error as AxiosResponse);
        /* console.log('error auth', error); */
        setIsLoading(false);
      }
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
          error: !!errors.email || serverError?.data.statusCode === 401,
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
                disabled={isLoading}
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
          error: !!errors.password || serverError?.data.statusCode === 401,
          helperText: errors.password?.message,
          autoComplete: 'current-password',
        }}
        error={serverError}
        setError={setServerError}
        isLoading={isLoading}
        submitButtonText="Login"
        onSubmit={onSubmit}
      />
    </StartLayout>
  );
};

export default TeacherLoginPage;
