/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useParams, Navigate } from 'react-router';
import {
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import useExam from '../hooks/queries/useExam';
import Routes from '../services/Router/Routes';

interface Props extends HomeLayoutProps {}

const ExamPage: React.FC<Props> = ({ ...rest }) => {
  const { id } = useParams<{ id: string }>();
  const { exam, isPending } = useExam(id ? +id : undefined);

  if (!id) {
    return <Navigate to={Routes.EXAMS_HISTORY} />;
  }

  if (isPending) {
    return (
      <HomeLayout {...rest}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </HomeLayout>
    );
  }

  if (!exam) {
    return (
      <HomeLayout {...rest}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h4">Exam not found</Typography>
        </Box>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout {...rest}>
      <Paper elevation={3} style={{ padding: '2rem', margin: '2rem 0' }}>
        <Typography variant="h3" gutterBottom>
          {exam.test.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {exam.test.description}
        </Typography>
      </Paper>

      <Paper elevation={3} style={{ padding: '2rem', margin: '2rem 0' }}>
        <Typography variant="h4" gutterBottom>
          Questions
        </Typography>
        <List>
          {exam.test.testQuestions.map((testQuestion, index) => (
            <Box key={testQuestion.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${index + 1}. ${testQuestion.question.title}`}
                  secondary={
                    <Box ml={2}>
                      {testQuestion.question.answers.map((answer, answerIndex) => (
                        <Typography key={answerIndex}>
                          {String.fromCharCode(65 + answerIndex)}. {answer.title}
                        </Typography>
                      ))}
                    </Box>
                  }
                />
              </ListItem>
              <Box ml={4} mb={2}>
                <Typography variant="body2" color="textSecondary">
                  Time Limit: {testQuestion.timeLimit} minutes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Max Score: {testQuestion.maxScore}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Results:
                </Typography>
                {testQuestion.results.map((result, resultIndex) => (
                  <Box key={resultIndex} ml={2}>
                    <Typography variant="body2">Student: {result.studentName}</Typography>
                    <Typography variant="body2">
                      Answer:{' '}
                      {result.studentAnswer
                        ? result.studentAnswer.answers.map((answer) => answer.title).join(', ')
                        : 'No answer provided'}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Divider />
            </Box>
          ))}
        </List>
      </Paper>
    </HomeLayout>
  );
};

export default ExamPage;
