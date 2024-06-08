import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Navigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginForm from '../components/forms/LoginForm';
import StartLayout from '../components/layouts/StartLayout';
import studentExamStore from '../store/ExamStore/StudentExamStore';
import Routes from '../services/Router/Routes';
import useConnectToExamLikeStudent from '../hooks/queries/useConnectToExamLikeStudent';
import LoadingPage from './LoadingPage';

const defaultValues: JoinFormType = { name: '', code: '' };
const JoinFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(15, 'Max length is 15'),
  code: z
    .string()
    .min(1, 'Code is required')
    .regex(/^[0-9]+$/, 'Code must contain only digits')
    .length(6, 'Code length must be 6'),
});

type JoinFormType = z.infer<typeof JoinFormSchema>;

const JoinPage: React.FC = observer(() => {
  const [reconnect, { connectToExam, error, isPending, reset }] = useConnectToExamLikeStudent();
  const { register, handleSubmit, formState } = useForm<JoinFormType>({
    resolver: zodResolver(JoinFormSchema),
    defaultValues,
  });

  if (reconnect.isLoading) {
    return <LoadingPage />;
  }

  if (reconnect.isSuccess) {
    return <Navigate to={Routes.ONGOING_EXAM} />;
  }

  if (studentExamStore.status !== 'idle') {
    return <Navigate to={Routes.ONGOING_EXAM} />;
  }

  const { errors } = formState;
  const onSubmit = handleSubmit(({ code, name }) => {
    connectToExam({ examCode: code, studentName: name });
  });

  return (
    <StartLayout backBtn>
      <LoginForm
        firstFieldProps={{
          label: 'Name',
          placeholder: 'Enter name',
          required: true,
          ...register('name'),
          error: !!errors.name || !!error,
          helperText: errors.name?.message,
          autoComplete: 'off',
        }}
        secondFieldProps={{
          label: 'Code',
          placeholder: 'Enter code',
          inputProps: {
            maxLength: 6,
          },
          required: true,
          ...register('code'),
          error: !!errors.code || !!error,
          helperText: errors.code?.message,
          autoComplete: 'off',
        }}
        submitButtonText="Join"
        errorMessage={error?.message ?? null}
        onErrorClose={reset}
        isLoading={isPending}
        onSubmit={onSubmit}
      />
    </StartLayout>
  );
});

export default JoinPage;
