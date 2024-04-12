import { Button } from '@mui/material';
import { StudentAnswer } from '../../../dev/questions';

interface Props {
  setValue: React.Dispatch<React.SetStateAction<StudentAnswer[]>>;
  setIsShowAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  value: StudentAnswer[];
}

const SubmitButton: React.FC<Props> = ({ setValue, value, setIsShowAnswers }) => (
  <Button
    variant="contained"
    sx={{ alignSelf: 'center', width: '120px' }}
    onClick={() => {
      setValue(value);
      setIsShowAnswers(false);
      // eslint-disable-next-line no-console
      console.log(value);
    }}
  >
    Submit
  </Button>
);

export default SubmitButton;
