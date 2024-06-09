import { Box, BoxProps, Typography } from '@mui/material';
import { FieldArrayWithId } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { CreateTestFormType } from '../../../schemas/createTestFormValidationSchemas';
import QuestionCard from '../items/QuestionCard';
import useCreateTestForm from '../../../hooks/useCreateTestForm';

interface Props extends BoxProps {
  questions: FieldArrayWithId<CreateTestFormType, 'questions', 'id'>[];
  onRemove: (index: number) => void;
}

const FormQuestionList: React.FC<Props> = ({ questions, onRemove, ...props }) => {
  const {
    formState: { errors },
    watch,
  } = useCreateTestForm();

  const lastItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastItemRef.current && questions.length > 1) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questions]);

  return (
    <Box {...props}>
      {(errors.questions?.message || errors.questions?.root?.message) && (
        <Typography color="error" variant="body1">
          {errors.questions.message || errors.questions.root?.message}
        </Typography>
      )}

      <Box display="flex" flexDirection="column" alignItems="center" gap="24px">
        {questions.map((field, index) => {
          const onDelete = (openSnackBar: () => void) => {
            if (questions.length < 2) {
              openSnackBar();
            } else {
              onRemove(index);
            }
          };

          return (
            <QuestionCard
              ref={index === questions.length - 1 ? lastItemRef : null}
              isFromServer={field.isFromServer}
              key={field.id}
              questionIndex={index}
              type={watch(`questions.${index}.type`)}
              onDelete={onDelete}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default FormQuestionList;
