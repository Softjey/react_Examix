import { useState } from 'react';
import { ButtonGroup, Button, Alert } from '@mui/material';
import { Question } from '../../temp/questions';

interface Props {
  question: Question;
}

const RadioButtonGroup: React.FC<Props> = ({ question }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const onSubmit = () => {
    if (selectedIndex === -1) {
      setIsAlert(true);
    } else {
      setIsAlert(false);
      setIsDisabled(true);
    }
  };

  return (
    <>
      <ButtonGroup disabled={isDisabled} fullWidth orientation="vertical">
        {question.variants.map((variant, i) => (
          <Button
            variant={selectedIndex === i ? 'contained' : 'outlined'}
            onClick={() => setSelectedIndex(i)}
            sx={{ height: '60px' }}
            size="large"
          >
            {variant}
          </Button>
        ))}
      </ButtonGroup>
      <Button onClick={onSubmit} variant="contained">
        Submit
      </Button>
      {isAlert && <Alert severity="warning">Select the variant</Alert>}
    </>
  );
};

export default RadioButtonGroup;
