/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import LoginForm from '../../components/forms/LoginForm';
import { Nullable } from '../../types/utils/Nullable';
import StartLayout from '../../components/layouts/StartLayout';

const StudentJoinShema = z.object({
  name: z.string().min(1, 'Name is required').max(15, 'Max length is 15'),
  code: z
    .string()
    .min(1, 'Code is required')
    .regex(/^[0-9]+$/, 'Code must contain only digits')
    .length(6, 'Code length must be 6'),
});

type LoginFormType = z.infer<typeof StudentJoinShema>;

const StudentJoinPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<Nullable<AxiosResponse>>(null);

  const defaultValues: LoginFormType = {
    name: '',
    code: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(StudentJoinShema),
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    if (data.name && data.code) {
      setIsLoading(true);

      // server request emulation
      setTimeout(() => {
        setIsLoading(false);
        console.log(data);
      }, 1000);

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
    <StartLayout backBtn>
      <LoginForm
        firstFieldProps={{
          label: 'Name',
          placeholder: 'Enter name',
          variant: 'outlined',
          fullWidth: true,
          required: true,
          ...register('name'),
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
          ...register('code'),
          error: !!errors.code,
          helperText: errors.code?.message,
          autoComplete: 'off',
        }}
        submitButtonText="Join"
        error={serverError}
        setError={setServerError}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </StartLayout>
  );
};

export default StudentJoinPage;
