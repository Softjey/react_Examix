/* eslint-disable no-console */

import { Box, Stack, TextField, TextFieldProps } from '@mui/material';
import { useForm } from 'react-hook-form';
import MainButton from '../../components/UI/buttons/MainButton';
import { columnCenter } from '../../styles/flex';
import StartLayout from '../../components/layouts/StartLayout';

interface Props {
  onSubmit: (data: LoginForm) => void;
  firstFieldProps: TextFieldProps;
  secondFieldProps: TextFieldProps;
  submitButtonText: string;
}

export interface LoginForm {
  firstField: string;
  secondField: string;
}

const defaultValues: LoginForm = {
  firstField: '',
  secondField: '',
};

const LoginPage: React.FC<Props> = ({
  onSubmit,
  firstFieldProps,
  secondFieldProps,
  submitButtonText,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({ defaultValues });

  console.log(errors);
  console.log(watch());

  return (
    <StartLayout backBtn>
      <Box
        component="form"
        noValidate
        sx={{ gap: '20px', ...columnCenter }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack width="300px" direction="column" spacing={2}>
          <TextField {...register('firstField')} {...firstFieldProps} />
          <TextField {...register('secondField')} {...secondFieldProps} />
        </Stack>
        <MainButton disableElevation variant="contained" type="submit">
          {submitButtonText}
        </MainButton>
      </Box>
    </StartLayout>
  );
};

export default LoginPage;
