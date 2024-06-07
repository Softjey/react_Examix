import { Typography, Stack, Box, StackProps } from '@mui/material';
import React from 'react';
import { TestQuestion } from '../../types/api/entities/testQuestion';
import SubjectItem from './SubjectItem/SubjectItem';
import prettifyDuration from '../../utils/time/prettifyDuration';
import RectChip from './RectChip';
import { Answer, Question } from '../../types/api/entities/question';
import AnswerItem from '../items/AnswerItem';
import { Nullable } from '../../types/utils/Nullable';

export interface Props extends StackProps {
  question: TestQuestion | Question;
  index?: number;
  studentAnswers?: Nullable<Pick<Answer, 'title'>[]>;
}

const QuestionItem: React.FC<Props> = ({ question, index, studentAnswers, ...rest }) => {
  const isTestQuestion = 'maxScore' in question;
  const { answers, subject, title, type } = isTestQuestion ? question.question : question;

  return (
    <Stack direction="row" spacing={3} justifyContent="space-between" component="article" {...rest}>
      <Stack flexGrow={1} spacing={2}>
        <Typography variant="h6">{`${index !== undefined ? `${index + 1})` : ''} ${title}`}</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, pl: 5 }}>
          {answers.map((answer, answerIndex) => (
            <AnswerItem
              // We can use index here because answers are static and won't change
              // eslint-disable-next-line react/no-array-index-key
              key={answerIndex}
              answer={answer}
              questionType={type}
              studentAnswers={studentAnswers}
            />
          ))}
        </Box>
      </Stack>

      {isTestQuestion && (
        <Stack spacing={2} width={140} pt={1}>
          <SubjectItem
            chipVariant="outlined"
            subject={subject}
            variant="chip"
            sx={{ borderRadius: 1 }}
          />

          <Stack direction="row" justifyItems="stretch" gap={1}>
            <RectChip label={`${question.maxScore} points`} />
            <RectChip label={prettifyDuration(question.timeLimit * 1000)} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default QuestionItem;
