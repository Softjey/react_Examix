import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Layout from '../Layout';
import { Answer, newQuestions as questions } from '../constants/questions';
import QuizCard from '../components/QuizCard';

const QuizPage: React.FC = () => {
  const [step, setStep] = useState(0);
  // state with saved answers to compare on server
  // eslint-disable-next-line operator-linebreak
  const [answers, setAnswers]: [Answer[], React.Dispatch<React.SetStateAction<Answer[]>>] =
    useState([{}]);
  // очень трудно обьяснить на английском, поэтому в кратце проблема такая:
  // у меня не получается типизировать стейт что бы передать его как пропсы в QuizCard
  // вернее у меня получилось вроде как,
  // но проблема в том что мне нужно передать начальное значение пустой обьект
  // и изза этого в списке ответов лишний пустой обьект в начале
  const progress = Math.round((step / questions.length) * 100);
  return (
    <Layout>
      {step < questions.length ? (
        <QuizCard
          nextQuestion={() => setStep(step + 1)}
          setAnswers={setAnswers}
          question={questions[step]}
          progress={progress}
        />
      ) : (
        // this is the test fragment, it should be replaced with results page
        <Box flexDirection="column" display="flex" gap="20px">
          <h1>Done</h1>
          <TableContainer component={Paper} sx={{ width: 650, height: 300 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>question id</TableCell>
                  <TableCell>answer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {answers.map((answer) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">{answer.questionId}</TableCell>
                    <TableCell align="right">{answer.answer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button size="large" onClick={() => window.location.reload()}>
            Restart
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default QuizPage;
