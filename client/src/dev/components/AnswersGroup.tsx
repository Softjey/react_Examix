import { Box, BoxProps, Typography } from '@mui/material';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import QuestionType from '../../types/api/enums/Type';
import { CreateTestForm } from '../../schemas/createTestFormValidationSchemas';
import FormAnswerItem from '../../components/items/FormAnswerItem';

interface Props extends BoxProps {
  questionType: QuestionType;
  questionIndex: number;
  fields: FieldArrayWithId<CreateTestForm, `questions.${number}.answers`, 'id'>[];
  onItemRemove: (index: number) => void;
}

const AnswersGroup: React.FC<Props> = ({
  fields,
  questionType,
  questionIndex,
  onItemRemove,
  ...boxProps
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTestForm>();

  const updateCorrect = (index: number) => {
    const answers = watch(`questions.${questionIndex}.answers`);

    if (questionType === QuestionType.SINGLE_CHOICE) {
      if (answers.some((item, i) => item.isCorrect && i !== index)) {
        // If any checkbox is checked and it's not the current one, uncheck all checkboxes
        setValue(
          `questions.${questionIndex}.answers`,
          answers.map((item, i) => {
            return { ...item, isCorrect: i === index };
          }),
        );
      } else {
        // Otherwise, toggle the checkbox state
        setValue(
          `questions.${questionIndex}.answers`,
          answers.map((item, i) => (i === index ? { ...item, isCorrect: !item.isCorrect } : item)),
        );
      }
    }
  };

  useEffect(() => {
    if (questionType === QuestionType.SINGLE_CHOICE) {
      const answers = watch(`questions.${questionIndex}.answers`);
      // set the first one checked and the rest unchecked
      setValue(
        `questions.${questionIndex}.answers`,
        answers.map((item, index) => ({ ...item, isCorrect: index === 0 })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionType]);

  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} {...boxProps}>
        {fields.map((item, index) => (
          <FormAnswerItem
            onCheckBoxClick={() => updateCorrect(index)}
            onDelete={() => onItemRemove(index)}
            answerIndex={index}
            questionIndex={questionIndex}
            key={item.id}
            type={questionType}
          />
        ))}
      </Box>
      {errors.questions?.[questionIndex]?.answers && (
        <Typography align="center" color="error" variant="body2">
          {errors?.questions[questionIndex]?.answers?.root?.message ||
            errors?.questions[questionIndex]?.answers?.message}
        </Typography>
      )}
    </>
  );
};

export default AnswersGroup;
