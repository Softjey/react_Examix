import { Box, BoxProps, Stack, SxProps, Theme, Typography } from '@mui/material';
import { FieldArrayWithId } from 'react-hook-form';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CreateTestFormType } from '../schemas/createTestFormValidationSchemas';
import QuestionCard from '../items/QuestionCard';
import useCreateTestForm from '../../../hooks/useCreateTestForm';
import { Nullable } from '../../../types/utils/Nullable';
import reorderQuestions from '../utils/reorderQuestions';

interface Props extends BoxProps {
  questionFields: FieldArrayWithId<CreateTestFormType, 'questions', 'id'>[];
  onRemove: (index: number) => void;
  shouldScroll: MutableRefObject<boolean>;
}

const FormQuestionList: React.FC<Props> = ({
  shouldScroll,
  questionFields,
  onRemove,
  ...props
}) => {
  const {
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useCreateTestForm();

  const lastItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastItemRef.current && shouldScroll.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });

      // this is necessary because scrollIntoView must be called only when appended new question
      // eslint-disable-next-line no-param-reassign
      shouldScroll.current = false;
    }
  }, [questionFields, shouldScroll]);

  const [dragItemIndex, setDragItemIndex] = useState<Nullable<number>>(null);
  const [dragTargetItemIndex, setDragTargetItemIndex] = useState<Nullable<number>>(null);

  const watchedQuestions = watch('questions');

  const handleDragStart = (position: number) => {
    setDragItemIndex(position);
  };

  const handleDragEnter = (position: number, e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.types.length > 0) {
      return;
    }

    setDragTargetItemIndex(position);
  };

  const handleDragEnd = () => {
    setDragItemIndex(null);
    setDragTargetItemIndex(null);

    const reorderedQuestions = reorderQuestions(
      [...watchedQuestions],
      dragItemIndex!,
      dragTargetItemIndex!,
    );

    setValue('questions', reorderedQuestions);
    trigger('questions');
  };

  return (
    <Box onDrop={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()} {...props}>
      {(errors.questions?.message || errors.questions?.root?.message) && (
        <Typography color="error" variant="body1">
          {errors.questions.message || errors.questions.root?.message}
        </Typography>
      )}

      <Stack alignItems="center" gap="24px">
        {questionFields.map((field, index) => {
          const onDelete = (openSnackBar: () => void) => {
            if (questionFields.length < 2) {
              openSnackBar();
            } else {
              onRemove(index);
            }
          };

          const showPasteBar =
            dragTargetItemIndex !== null && questionFields[dragTargetItemIndex!].id === field.id;

          const isTransparent =
            dragItemIndex !== null && questionFields[dragItemIndex!].id === field.id;

          const pasteBarSx: SxProps<Theme> | undefined = () => ({
            content: '""',
            position: 'absolute',
            width: '100%',
            top: -13,
            height: '3px',
            backgroundColor: (theme) => theme.palette.info.main,
          });

          return (
            <Box
              key={field.id}
              sx={{
                position: 'relative',
                width: '100%',
                ':before': showPasteBar ? pasteBarSx : {},
              }}
            >
              <QuestionCard
                sx={isTransparent ? { opacity: 0.3 } : {}}
                onDragStart={() => handleDragStart(index)}
                onDragEnter={(e) => handleDragEnter(index, e)}
                onDragEnd={handleDragEnd}
                ref={index === questionFields.length - 1 ? lastItemRef : null}
                isFromServer={field.isFromServer}
                key={field.id}
                questionIndex={index}
                type={watchedQuestions[index].type}
                onDelete={onDelete}
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default FormQuestionList;
