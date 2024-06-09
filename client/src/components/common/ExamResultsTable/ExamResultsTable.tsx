import React, { memo, useMemo } from 'react';
import { Divider, Stack } from '@mui/material';
import { TableContainer, TableContainerProps, Typography } from '@mui/material';
import { Paper, Table, TableBody, TableCell } from '@mui/material';
import { TableHead, TableRow } from '@mui/material';
import { TestQuestionWithResults } from '../../../types/api/entities/testQuestion';
import getExamResultsTableData from './getExamResultsTableData';
import QuestionsDialogButton from '../QuestionsDialogButton';
import roundToFixedLength from '../../../utils/roundToFixedLength';
import sx from './sx';
import { SxTheme } from '../../../types/utils/SxTheme';

interface Props extends TableContainerProps<typeof Paper> {
  questions: TestQuestionWithResults[];
}

const ExamResultsTable: React.FC<Props> = memo(({ questions, sx: containerSx, ...rest }) => {
  const { results, testMaxScore } = useMemo(() => getExamResultsTableData(questions), [questions]);
  const container = { ...sx.container, ...containerSx } as SxTheme;
  const digitsLength = 2;

  return (
    <TableContainer sx={container} component={Paper} variant="outlined" {...rest}>
      <Table stickyHeader>
        <TableHead>
          <TableRow hover>
            <TableCell sx={sx.studentsQuestionsCell}>Students / Questions</TableCell>

            {questions.map(({ question, maxScore, id }, index) => (
              <TableCell key={id} sx={sx.questionCell} align="center" title={question.title}>
                <QuestionsDialogButton
                  question={questions[index]}
                  questionIndex={index}
                  sx={sx.dialogButton}
                >
                  {index + 1}
                  <br />({maxScore})
                </QuestionsDialogButton>
              </TableCell>
            ))}

            <TableCell align="center" sx={sx.resultsCell}>
              Mark
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {results.map(([studentName, { scores, answers, scoreSum, percentage }]) => (
            <TableRow key={studentName} hover>
              <TableCell sx={sx.studentCell}>{studentName}</TableCell>

              {scores.map((score, index) => (
                // Answers are not unique and stable, so we need to use index as a key
                // eslint-disable-next-line react/no-array-index-key
                <TableCell key={index} sx={sx.scoreCell} align="center">
                  <QuestionsDialogButton
                    studentAnswers={answers[index]}
                    question={questions[index]}
                    questionIndex={index}
                    sx={sx.dialogButton}
                  >
                    {roundToFixedLength(score, digitsLength)}
                  </QuestionsDialogButton>
                </TableCell>
              ))}

              <TableCell align="center" sx={sx.resultCell}>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Typography variant="inherit">
                    {roundToFixedLength(scoreSum, digitsLength)}/{testMaxScore}
                  </Typography>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: (theme) => theme.palette.text.primary }}
                  />

                  <Typography variant="inherit">{Math.round(percentage * 100)}%</Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ExamResultsTable;
