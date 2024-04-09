import { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { StudentAnswer } from '../../temp/questions';
import SubmitButton from './buttons/SubmitButton';

interface Props {
  setValue: React.Dispatch<React.SetStateAction<StudentAnswer[]>>;
  setIsShowAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  answers: StudentAnswer[];
}

export const SingleButtonGroup: React.FC<Props> = ({ answers, setValue, setIsShowAnswers }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<StudentAnswer>({ title: '' });
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ButtonGroup fullWidth orientation="vertical">
        {answers.map((answer) => (
          <Button
            key={answer.title}
            variant={selectedAnswer.title === answer.title ? 'contained' : 'outlined'}
            onClick={() => setSelectedAnswer(answer)}
            sx={{ height: '60px' }}
            size="large"
          >
            {answer.title}
          </Button>
        ))}
      </ButtonGroup>
      <SubmitButton
        setIsShowAnswers={setIsShowAnswers}
        setValue={setValue}
        value={[selectedAnswer]}
      />
    </div>
  );
};

export const MultipleButtonGroup: React.FC<Props> = ({ answers, setValue, setIsShowAnswers }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<StudentAnswer[]>([]);
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ButtonGroup fullWidth orientation="vertical">
        {answers.map((answer) => {
          const isSelected = selectedAnswers.some(
            (selectedAnswer) => selectedAnswer.title === answer.title,
          );

          return (
            <Button
              key={answer.title}
              variant="outlined"
              onClick={() => {
                if (isSelected) {
                  setSelectedAnswers(
                    selectedAnswers.filter(
                      (selectedAnswer) => selectedAnswer.title !== answer.title,
                    ),
                  );
                } else {
                  setSelectedAnswers([...selectedAnswers, answer]);
                }
              }}
              sx={{
                height: '60px',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '10px',
              }}
              size="large"
            >
              {/* fake checkbox, just icon, because i used button instead of checkbox */}
              {isSelected ? <CheckBox /> : <CheckBoxOutlineBlank />}
              {answer.title}
            </Button>
          );
        })}
      </ButtonGroup>
      <SubmitButton
        setIsShowAnswers={setIsShowAnswers}
        setValue={setValue}
        value={selectedAnswers}
      />
    </div>
  );
};
