import useLogin from '../../hooks/queries/useLogin';
import LoginPage, { LoginForm } from './LoginPage';

const TeacherLoginPage: React.FC = () => {
  const loginMutation = useLogin();

  const onSubmit = (data: LoginForm) => {
    if (data.firstField && data.secondField) {
      const email = data.firstField;
      const password = data.secondField;

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
        required: true,
      }}
      secondFieldProps={{
        label: 'Password',
        placeholder: 'Enter password',
        variant: 'outlined',
        type: 'password',
        fullWidth: true,
        required: true,
      }}
      submitButtonText="Login"
      onSubmit={onSubmit}
    />
  );
};

export default TeacherLoginPage;
