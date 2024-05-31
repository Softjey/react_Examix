import { useRef } from 'react';
import useLogin from '../../hooks/queries/useLogin';
import LoginPage from './LoginPage';

const TeacherLoginPage: React.FC = () => {
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  const loginMutation = useLogin();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (input1Ref.current && input2Ref.current) {
      const email = input1Ref.current.value;
      const password = input2Ref.current.value;

      loginMutation.mutate(
        { email, password },
        {
          // TODO: Add error handling
          onError: (error) => {
            // eslint-disable-next-line no-console
            console.log('error auth', error);
          },
        },
      );
    }
  };
  return (
    <LoginPage
      firstFieldProps={{
        label: 'Email',
        placeholder: 'Enter email',
        variant: 'outlined',
        fullWidth: true,
        inputRef: input1Ref,
        required: true,
      }}
      secondFieldProps={{
        label: 'Password',
        placeholder: 'Enter password',
        variant: 'outlined',
        type: 'password',
        fullWidth: true,
        inputRef: input2Ref,
        required: true,
      }}
      submitButtonText="Login"
      onSubmit={onSubmit}
    />
  );
};

export default TeacherLoginPage;
