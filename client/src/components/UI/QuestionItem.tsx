import { Typography, BoxProps, Stack, Box } from '@mui/material';
import { FormControlLabel, Radio, Checkbox } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { TestQuestion } from '../../types/api/entities/testQuestion';
import SubjectItem from './SubjectItem/SubjectItem';
import prettifyDuration from '../../utils/prettifyDuration';
import QuestionType from '../../types/api/enums/Type';
import RectChip from './RectChip';

interface Props extends BoxProps {
  question: TestQuestion;
  index: number;
}

const QuestionItem: React.FC<Props> = ({ question, index, ...rest }) => {
  const {
    maxScore,
    question: { answers, subject, title, type },
    timeLimit,
  } = question;

  return (
    <Stack direction="row" spacing={3} justifyContent="space-between" component="article" {...rest}>
      <Stack flexGrow={1} spacing={2}>
        <Typography variant="h6">{`${index + 1}) ${title}`}</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, pl: 5 }}>
          {answers.map((answer, answerIndex) => (
            <FormControlLabel
              // We can use index here because answers are static and won't change
              // eslint-disable-next-line react/no-array-index-key
              key={answerIndex}
              value={answer.title}
              sx={{
                pointerEvents: 'none',
                padding: 0.8,
                borderRadius: 1,
                borderWidth: 3,
                borderColor: answer.isCorrect ? 'secondary.light' : grey[500],
                borderStyle: 'solid',
              }}
              control={
                type === QuestionType.MULTIPLE_CHOICE ? (
                  <Checkbox size="small" color="secondary" checked={answer.isCorrect} />
                ) : (
                  <Radio size="small" color="secondary" checked={answer.isCorrect} />
                )
              }
              label={`${answer.title}`}
              slotProps={{ typography: { variant: 'body1', fontWeight: 300 } }}
            />
          ))}
        </Box>
      </Stack>

      <Stack spacing={2} width={140} pt={1}>
        <SubjectItem
          chipVariant="outlined"
          subject={subject}
          variant="chip"
          sx={{ borderRadius: 1 }}
        />

        <Stack direction="row" justifyItems="stretch" gap={1}>
          <RectChip label={`${maxScore} points`} />
          <RectChip label={prettifyDuration(timeLimit)} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QuestionItem;
