import { useRef } from 'react';
import { useNavigate } from 'react-router';
import LoginPage from './LoginPage';
import examCode from '../../store/examCode';
import studentName from '../../store/studentName';
import Routes from '../../services/Router/Routes';

const StudentJoinPage: React.FC = () => {
  const navigate = useNavigate();
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (input1Ref.current?.value) {
      studentName.setName(input1Ref.current.value);
    }
    if (input2Ref.current?.value) {
      examCode.setCode(input2Ref.current.value);
    }
    if (input1Ref.current?.value && input2Ref.current?.value) {
      navigate(Routes.WAITING_PAGE);
    }
  };

  return (
    <LoginPage
      firstFieldProps={{
        label: 'Name',
        placeholder: 'Enter name',
        variant: 'outlined',
        fullWidth: true,
        inputRef: input1Ref,
        required: true,
      }}
      secondFieldProps={{
        label: 'Code',
        placeholder: 'Enter code',
        variant: 'outlined',
        fullWidth: true,
        inputProps: {
          maxLength: 6,
        },
        inputRef: input2Ref,
        required: true,
      }}
      submitButtonText="Join"
      onSubmit={onSubmit}
    />
  );
};

export default StudentJoinPage;
