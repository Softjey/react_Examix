/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import LoginPage, { LoginForm } from './LoginPage';

const StudentJoinPage: React.FC = () => {
  const defaultValues: LoginForm<'name', 'code'> = {
    name: '',
    code: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm<'name', 'code'>>({ defaultValues, mode: 'onBlur' });

  console.log(errors);
  console.log(watch());

  const onSubmit = handleSubmit((data) => {
    if (data.name && data.code) {
      console.log(data);
      // TODO: make it when add quiz logic
      /*
      const { name, code } = data;
      examSocket.createSocket({
            role: ExamRole.STUDENT,
            examCode: code,
            studentName: name,
          });
      navigate(Routes.WAITING_PAGE);
      */
    }
  });

  return (
    <LoginPage
      firstFieldProps={{
        label: 'Name',
        placeholder: 'Enter name',
        variant: 'outlined',
        fullWidth: true,
        required: true,
        ...register('name', { required: { value: true, message: 'Name is required' } }),
        error: !!errors.name,
        helperText: errors.name?.message,
      }}
      secondFieldProps={{
        label: 'Code',
        placeholder: 'Enter code',
        variant: 'outlined',
        fullWidth: true,
        inputProps: {
          maxLength: 6,
        },
        required: true,
        ...register('code', { required: { value: true, message: 'Code is required' } }),
        error: !!errors.code,
        helperText: errors.code?.message,
      }}
      submitButtonText="Join"
      onSubmit={onSubmit}
    />
  );
};

export default StudentJoinPage;
