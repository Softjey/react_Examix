import Button from './Button';
import { StudentAnswer } from '../../../dev/questions';

interface Props {
  setValue: React.Dispatch<React.SetStateAction<StudentAnswer[] | null>>;
  setIsShowAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  value: StudentAnswer[] | null;
}

const SubmitButton: React.FC<Props> = ({ setValue, value, setIsShowAnswers }) => (
  <Button
    disableElevation
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
