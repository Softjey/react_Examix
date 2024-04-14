/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
import { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  RadioButtonCheckedOutlined,
  RadioButtonUncheckedOutlined,
} from '@mui/icons-material';
import { QuestionType, StudentAnswer } from '../../dev/questions';
import SubmitButton from './buttons/SubmitButton';

interface Props {
  setValue: React.Dispatch<React.SetStateAction<StudentAnswer[] | null>>;
  setIsShowAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  answers: StudentAnswer[];
  type?: QuestionType;
}

const AnswersButtonGroup: React.FC<Props> = ({ answers, setValue, setIsShowAnswers, type }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<StudentAnswer[] | null>(null);
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <ButtonGroup fullWidth orientation="vertical">
        {answers.map((answer) => {
          const isTypeSingle = type === QuestionType.SINGLE_CHOICE;
          // eslint-disable-next-line operator-linebreak
          const isSelected =
            selectedAnswers !== null
              ? isTypeSingle
                ? selectedAnswers[0].title === answer.title
                : selectedAnswers.some((selectedAnswer) => selectedAnswer.title === answer.title)
              : false;
          const onButtonClick = isTypeSingle
            ? () => setSelectedAnswers([answer])
            : () => {
                if (selectedAnswers !== null) {
                  if (isSelected) {
                    setSelectedAnswers(
                      selectedAnswers.filter(
                        (selectedAnswer) => selectedAnswer.title !== answer.title,
                      ),
                    );
                  } else {
                    setSelectedAnswers([...selectedAnswers, answer]);
                  }
                } else {
                  setSelectedAnswers([answer]);
                }
              };
          return (
            <Button
              key={answer.title}
              disableElevation
              variant="outlined"
              onClick={onButtonClick}
              sx={{
                height: '60px',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '10px',
              }}
              size="large"
            >
              { }
              {isTypeSingle ? (
                isSelected ? (
                  <RadioButtonCheckedOutlined />
                ) : (
                  <RadioButtonUncheckedOutlined />
                )
              ) : isSelected ? (
                <CheckBox />
              ) : (
                <CheckBoxOutlineBlank />
              )}
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

export default AnswersButtonGroup;
