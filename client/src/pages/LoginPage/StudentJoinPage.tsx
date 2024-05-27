/* import { useRef } from 'react';
import { useNavigate } from 'react-router'; */
import LoginPage from './LoginPage';

// import examSocket, { ExamRole } from '../../store/examSocket';
// import Routes from '../../services/Router/Routes';

const StudentJoinPage: React.FC = () => {
  /* const navigate = useNavigate();
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null); */

  /* const onSubmit = () => {
    if (input1Ref.current?.value && input2Ref.current?.value) {
      examSocket.createSocket({
        role: ExamRole.STUDENT,
        examCode: input2Ref.current.value,
        studentName: input1Ref.current.value,
      });

      navigate(Routes.WAITING_PAGE);
    }
  }; */

  return (
    <LoginPage
      firstFieldProps={{
        label: 'Name',
        placeholder: 'Enter name',
        variant: 'outlined',
        fullWidth: true,
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
        required: true,
      }}
      submitButtonText="Join"
      onSubmit={() => {}}
    />
  );
};

export default StudentJoinPage;
