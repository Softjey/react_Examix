/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  CircularProgressProps,
  // LinearProgress,
  // LinearProgressProps,
  Typography,
} from '@mui/material';
import React, { memo, useEffect, useRef, useState } from 'react';
import StartLayout from '../components/StartLayout';
// eslint-disable-next-line import/no-cycle
import questions from './questions';
import { MultipleButtonGroup, SingleButtonGroup } from '../components/UI/AnswersButtonGroups';

interface StudentAnswer {
  title: string;
}

export interface Question {
  id: number;
  index: number;
  answers: StudentAnswer[];
  type: 'single' | 'multiple';
  title: string;
  maxScore: number;
  timeLimit: number;
}

const QuizPage: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const currIndex = useRef(0);
  // server request emulation
  useEffect(() => {
    setTimeout(() => {
      setQuestion(questions[currIndex.current]);
    }, 2000);

    const timer = setTimeout(
      () => {
        setQuestion(questions[currIndex.current + 1]);
      },
      questions[currIndex.current].timeLimit * 1000 + 2000,
    );

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!question) return;

    setTime(0);

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [question]);

  return (
    <StartLayout>
      {question !== null ? (
        <>
          {/* <LinearProgressWithCSS value={time} max={question.timeLimit} /> */}
          <CircularProgressWithLabel value={time} max={question.timeLimit} />
          <QuizCard question={question} sendAnswer={() => {}} />
        </>
      ) : (
        <div css={{ width: '120px', height: '120px', display: 'flex' }}>
          <CircularProgress />
        </div>
      )}
    </StartLayout>
  );
};

export default QuizPage;

interface CardProps {
  question: Question;
  sendAnswer: (answer: StudentAnswer[]) => void;
}

export const QuizCard: React.FC<CardProps> = memo(
  ({ question: { title, answers, maxScore, type } }) => {
    const [selectedValue, setSelectedValue] = useState<StudentAnswer[]>([]);
    const [isShowAnswers, setIsShowAnswers] = useState(true);

    useEffect(() => {
      setIsShowAnswers(true);
    }, [answers]);

    return isShowAnswers ? (
      <Card>
        <CardHeader title="Max score:" subheader={maxScore} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          { }
          {type === 'single' ? (
            <SingleButtonGroup
              answers={answers}
              setIsShowAnswers={setIsShowAnswers}
              setValue={setSelectedValue}
            />
          ) : (
            <MultipleButtonGroup
              answers={answers}
              setIsShowAnswers={setIsShowAnswers}
              setValue={setSelectedValue}
            />
          )}
        </CardActions>
      </Card>
    ) : (
      <Alert severity="info">
        <AlertTitle>Wait for the timer ends</AlertTitle>
        {JSON.stringify(selectedValue)}
      </Alert>
    );
  },
);

/* const LinearProgressWithCSS = (props: LinearProgressProps & { value: number; max: number }) => {
  const fixProgressAnimationStyles = {
    width: '100%',
    '&[aria-valuenow="100"]': {
      '& > .progressBarInner': {
        transition: 'none',
      },
    },
  };
  const progress = (props.value / props.max) * 100;
  return (
    <LinearProgress
      sx={fixProgressAnimationStyles}
      classes={{ bar: 'progressBarInner' }}
      variant="determinate"
      value={progress}
    />
  );
}; */

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number; max: number },
) => {
  const progress = (props.value / props.max) * 100;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}s`}
        </Typography>
      </Box>
    </Box>
  );
};
