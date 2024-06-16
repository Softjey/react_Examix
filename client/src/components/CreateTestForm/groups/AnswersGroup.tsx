import { Box, BoxProps, Stack, Typography } from '@mui/material';
import { FieldArrayWithId } from 'react-hook-form';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import QuestionType from '../../../types/api/enums/Type';
import { CreateTestFormType } from '../schemas/createTestFormValidationSchemas';
import FormAnswerItem from '../items/FormAnswerItem';
import Button from '../../UI/buttons/Button';
import { useCreateTest } from '../../../pages/CreateTestPage/CreateTestContext';
import useCreateTestForm from '../../../hooks/useCreateTestForm';

interface Props extends BoxProps {
  questionType: QuestionType;
  questionIndex: number;
  fields: FieldArrayWithId<CreateTestFormType, `questions.${number}.answers`, 'id'>[];
  onItemRemove: (index: number) => void;
  onItemAdd: () => void;
  isFromServer?: boolean;
}

const AnswersGroup: React.FC<Props> = ({
  fields,
  questionType,
  questionIndex,
  onItemRemove,
  onItemAdd,
  isFromServer,
  ...boxProps
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useCreateTestForm();

  const { loading } = useCreateTest();

  const isShowAddButton = fields.length < 6 && !isFromServer;

  const isSingleChoice = questionType === QuestionType.SINGLE_CHOICE;

  const answersPath = `questions.${questionIndex}.answers` as const;

  const updateCorrect = (index: number) => {
    const answers = watch(answersPath);

    if (isSingleChoice) {
      if (answers.some((item, i) => item.isCorrect && i !== index)) {
        // If any checkbox is checked and it's not the current one, uncheck all checkboxes
        const answersWithOnlyCurrentChecked = answers.map((item, i) => {
          return { ...item, isCorrect: i === index };
        });

        setValue(answersPath, answersWithOnlyCurrentChecked);
      } else {
        // Otherwise, toggle the checkbox state
        const answersWithCurrentToggled = answers.map((item, i) => {
          return i === index ? { ...item, isCorrect: !item.isCorrect } : item;
        });

        setValue(answersPath, answersWithCurrentToggled);
      }
    }
  };

  useEffect(() => {
    if (isSingleChoice) {
      const answers = watch(answersPath);
      // set the first one checked and the rest unchecked
      const answersWithOnlyFirstChecked = answers.map((item, index) => ({
        ...item,
        isCorrect: index === 0,
      }));

      setValue(answersPath, answersWithOnlyFirstChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionType]);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        justifyContent="stretch"
        gap={2}
        {...boxProps}
      >
        {fields.map((item, index) => (
          <FormAnswerItem
            isFromServer={isFromServer}
            onCheckBoxClick={() => updateCorrect(index)}
            onDelete={() => onItemRemove(index)}
            answerIndex={index}
            questionIndex={questionIndex}
            key={item.id}
            type={questionType}
          />
        ))}

        {isShowAddButton && (
          <Stack direction="row">
            <Button
              disabled={loading}
              startIcon={
                <AddIcon
                  sx={(theme) => ({
                    width: 24,
                    height: 24,
                    marginX: '9px',
                    color: loading ? theme.palette.action.disabled : theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  })}
                />
              }
              sx={{
                paddingLeft: 0.5,
                flexGrow: 1,
                textTransform: 'none',
                justifyContent: 'start',
                fontSize: '16px',
                height: 42,
                opacity: 0.8,
                '&:hover': {
                  background: 'none',
                  opacity: 1,
                },
              }}
              onClick={onItemAdd}
            >
              Add new
            </Button>
          </Stack>
        )}
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
