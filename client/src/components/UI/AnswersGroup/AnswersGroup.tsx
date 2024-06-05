import { useState } from 'react';
import { Box } from '@mui/material';
import QuestionType from '../../../types/api/enums/Type';
import { StudentAnswer } from '../../../types/api/entities/question';
import SingleChoice from './SingleChoice';
import Button from '../buttons/Button';
import AnswersGroupProps from './AnswersGroupProps';
import MultipleChoice from './MultipleChoice';
import { ComponentProps } from '../../../types/utils/ComponentProps';

interface Props extends AnswersGroupProps, ComponentProps<'form'> {
  questionType: QuestionType;
}

const AnswersGroupComponent: React.FC<Props> = ({
  answers,
  onAnswer,
  questionType,
  css,
  ...rest
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<StudentAnswer[]>([]);
  const isAllowedType =
    questionType === QuestionType.MULTIPLE_CHOICE || questionType === QuestionType.SINGLE_CHOICE;

  if (!isAllowedType) {
    throw new Error('Unsupported question type');
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAnswer(selectedAnswers);
  };

  const onAnswerChange = (newAnswers: StudentAnswer[]) => {
    setSelectedAnswers(newAnswers);
  };

  const answersComponent = {
    [QuestionType.SINGLE_CHOICE]: <SingleChoice onAnswer={onAnswerChange} answers={answers} />,
    [QuestionType.MULTIPLE_CHOICE]: <MultipleChoice onAnswer={onAnswerChange} answers={answers} />,
  }[questionType];

  return (
    <form
      onSubmit={handleSubmit}
      css={{ display: 'flex', flexDirection: 'column', width: '100%', ...css }}
      {...rest}
    >
      <Box>{answersComponent}</Box>

      <Button sx={{ alignSelf: 'flex-end' }} variant="contained">
        Submit
      </Button>
    </form>
  );
};

const AnswerGroup = Object.assign(AnswersGroupComponent, {
  SingleChoice,
  MultipleChoice,
});

export default AnswerGroup;
