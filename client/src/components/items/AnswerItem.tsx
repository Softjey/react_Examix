import { FormControlLabelProps } from '@mui/material';
import { FormControlLabel, Radio, Checkbox } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import QuestionType from '../../types/api/enums/Type';
import { Answer } from '../../types/api/entities/question';
import { Nullable } from '../../types/utils/Nullable';

interface Props extends Omit<FormControlLabelProps, 'control' | 'label'> {
  answer: Answer;
  questionType: QuestionType;
  studentAnswers?: Nullable<Pick<Answer, 'title'>[]>;
}

const AnswerItem: React.FC<Props> = ({ answer, questionType, studentAnswers, ...rest }) => {
  const { isCorrect, title } = answer;
  const withStudentAnswers = studentAnswers !== undefined;
  const isStudentAnswer = studentAnswers?.some((studentAnswer) => studentAnswer.title === title);
  const checked = withStudentAnswers ? isStudentAnswer : isCorrect;
  const selectorColor = withStudentAnswers ? 'primary' : 'success';

  const control =
    questionType === QuestionType.MULTIPLE_CHOICE ? (
      <Checkbox size="small" color={selectorColor} checked={checked} />
    ) : (
      <Radio size="small" color={selectorColor} checked={checked} />
    );

  return (
    <FormControlLabel
      value={answer.title}
      sx={(theme) => ({
        pointerEvents: 'none',
        padding: 0.8,
        borderRadius: 1,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: isCorrect ? theme.palette.success.light : grey[500],
      })}
      control={control}
      label={`${answer.title}`}
      slotProps={{ typography: { variant: 'body1', fontWeight: 300 } }}
      {...rest}
    />
  );
};

export default AnswerItem;
