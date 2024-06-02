import { Box, BoxProps, Typography } from '@mui/material';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';
import QuestionCard from '../../components/items/QuestionCard';
import { CreateTestForm } from '../../schemas/createTestFormValidationSchemas';

interface Props extends BoxProps {
  fields: FieldArrayWithId<CreateTestForm, 'questions', 'id'>[];
  onRemove: (index: number) => void;
}

const QuestionsGroup: React.FC<Props> = ({ fields, onRemove, ...props }) => {
  const {
    formState: { errors },
    watch,
  } = useFormContext<CreateTestForm>();

  return (
    <Box {...props}>
      {(errors.questions?.message || errors.questions?.root?.message) && (
        <Typography color="error" variant="body1">
          {errors.questions.message || errors.questions.root?.message}
        </Typography>
      )}

      <Box display="flex" flexDirection="column" alignItems="center" gap="24px">
        {fields.map((field, index) => (
          <QuestionCard
            key={field.id}
            questionIndex={index}
            type={watch(`questions.${index}.type`)}
            onDelete={() => onRemove(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuestionsGroup;
