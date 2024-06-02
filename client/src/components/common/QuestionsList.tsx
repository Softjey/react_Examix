import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Divider, Stack, StackProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';
import React from 'react';
import { TestQuestion } from '../../types/api/entities/testQuestion';
import QuestionItem from '../UI/QuestionItem';

interface Props extends StackProps {
  questions: TestQuestion[];
  variant?: 'accordion' | 'list';
}

const QuestionsList: React.FC<Props> = ({ questions, variant = 'list', ...rest }) => {
  const questionsElements = questions.map((question, index) => (
    <Stack key={question.id} spacing={2}>
      <QuestionItem question={question} index={index} sx={{ paddingBlock: 2 }} />
      {index !== questions.length - 1 && <Divider color={grey['500']} />}
    </Stack>
  ));

  return (
    <Stack spacing={2} sx={{ paddingBlock: 3 }} component="section" {...rest}>
      {variant === 'list' && questionsElements}
      {variant === 'accordion' && (
        <Accordion variant="outlined">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Show questions</AccordionSummary>

          <AccordionDetails>{questionsElements}</AccordionDetails>
        </Accordion>
      )}
    </Stack>
  );
};

export default QuestionsList;
