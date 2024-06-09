/* eslint-disable */
import Button from './Button';

type StudentAnswer = any;

interface Props {
  setValue: React.Dispatch<React.SetStateAction<StudentAnswer[] | null>>;
  setIsShowAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  value: StudentAnswer[] | null;
}

const SubmitButton: React.FC<Props> = ({ setValue, value, setIsShowAnswers }) => (
  <Button
    variant="contained"
    sx={{ alignSelf: 'center', width: '120px' }}
    onClick={() => {
      setValue(value);
      setIsShowAnswers(false);

      console.log(value);
    }}
  >
    Submit
  </Button>
);

export default SubmitButton;
