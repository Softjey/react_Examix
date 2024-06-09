import { Box, BoxProps, Typography } from '@mui/material';
import { FieldArrayWithId } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { CreateTestFormType } from '../../../schemas/createTestFormValidationSchemas';
import QuestionCard from '../items/QuestionCard';
import useCreateTestForm from '../../../hooks/useCreateTestForm';

interface Props extends BoxProps {
  fields: FieldArrayWithId<CreateTestFormType, 'questions', 'id'>[];
  onRemove: (index: number) => void;
}

const QuestionsGroup: React.FC<Props> = ({ fields, onRemove, ...props }) => {
  const {
    formState: { errors },
    watch,
  } = useCreateTestForm();

  const lastItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastItemRef.current && fields.length > 1) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [fields]);

  return (
    <Box {...props}>
      {(errors.questions?.message || errors.questions?.root?.message) && (
        <Typography color="error" variant="body1">
          {errors.questions.message || errors.questions.root?.message}
        </Typography>
      )}

      <Box display="flex" flexDirection="column" alignItems="center" gap="24px">
        {fields.map((field, index) => {
          const onDelete = (openSnackBar: () => void) => {
            if (fields.length < 2) {
              openSnackBar();
            } else {
              onRemove(index);
            }
          };

          return (
            <QuestionCard
              ref={index === fields.length - 1 ? lastItemRef : null}
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

export default QuestionsGroup;
