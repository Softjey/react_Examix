import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { observer } from 'mobx-react-lite';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import { Nullable } from '../types/utils/Nullable';
import StartLayout from '../components/layouts/StartLayout';
import studentExamStore from '../store/ExamStore/StudentExamStore';

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
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<Nullable<string>>(null);

  const defaultValues: JoinFormType = {
    name: '',
    code: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormType>({
    resolver: zodResolver(JoinFormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async ({ code, name }) => {
    if (name && code) {
      setIsLoading(true);

      await studentExamStore
        .connectToExam({ examCode: code, studentName: name })
        .then(() => {})
        .catch((error) => {
          setServerErrorMessage(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  });

  return (
    <StartLayout backBtn>
      <LoginForm
        firstFieldProps={{
          label: 'Name',
          placeholder: 'Enter name',
          required: true,
          ...register('name'),
          error: !!errors.name || !!serverErrorMessage,
          helperText: errors.name?.message,
        }}
        secondFieldProps={{
          label: 'Code',
          placeholder: 'Enter code',
          inputProps: {
            maxLength: 6,
          },
          required: true,
          ...register('code'),
          error: !!errors.code || !!serverErrorMessage,
          helperText: errors.code?.message,
          autoComplete: 'off',
        }}
        submitButtonText="Join"
        errorMessage={serverErrorMessage}
        onErrorClose={() => setServerErrorMessage(null)}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </StartLayout>
  );
});

export default JoinPage;
