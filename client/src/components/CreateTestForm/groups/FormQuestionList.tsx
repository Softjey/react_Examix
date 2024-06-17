import { Box, BoxProps, Stack, Typography } from '@mui/material';
import { FieldArrayWithId } from 'react-hook-form';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CreateTestFormType } from '../schemas/createTestFormValidationSchemas';
import QuestionCard from '../items/QuestionCard';
import useCreateTestForm from '../../../hooks/useCreateTestForm';
import { Nullable } from '../../../types/utils/Nullable';
import reorderItems from '../utils/reorderItems';
import pasteBarSx from '../utils/pasteBarSx';

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
  const { watch, setValue, trigger, formState } = useCreateTestForm();

  const [dragItemIndex, setDragItemIndex] = useState<Nullable<number>>(null);
  const [dragTargetItemIndex, setDragTargetItemIndex] = useState<Nullable<number>>(null);

  const lastItemRef = useRef<HTMLDivElement>(null);

  const { errors } = formState;

  const watchedQuestions = watch('questions');

  const errorMessage = errors.questions?.message || errors.questions?.root?.message;

  useEffect(() => {
    if (lastItemRef.current && shouldScroll.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });

      // this is necessary because scrollIntoView must be called only when appended new question
      // eslint-disable-next-line no-param-reassign
      shouldScroll.current = false;
    }
  }, [questionFields, shouldScroll]);

  const handleDragStart = (position: number) => {
    setDragItemIndex(position);
  };

  const handleDragEnter = (position: number, e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.types.length <= 0) {
      setDragTargetItemIndex(position);
    }
  };

  const handleDragEnd = () => {
    setDragItemIndex(null);
    setDragTargetItemIndex(null);

    if (dragItemIndex !== null && dragTargetItemIndex !== null) {
      const reorderedQuestions = reorderItems(watchedQuestions, dragItemIndex, dragTargetItemIndex);

      setValue('questions', reorderedQuestions);
      trigger('questions');
    }
  };

  const isShowPasteBar = (fieldId: string) => {
    if (dragTargetItemIndex === null) {
      return false;
    }

    return questionFields[dragTargetItemIndex].id === fieldId;
  };

  const isTransparent = (fieldId: string) => {
    if (dragItemIndex === null) {
      return false;
    }

    return questionFields[dragItemIndex].id === fieldId;
  };

  const getDeleteFunc = (index: number) => {
    return (openSnackBar: () => void) => {
      if (questionFields.length < 2) {
        openSnackBar();
      } else {
        onRemove(index);
      }
    };
  };

  return (
    <Box onDrop={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()} {...props}>
      {errorMessage && (
        <Typography color="error" variant="body1">
          {errorMessage}
        </Typography>
      )}

      <Stack alignItems="center" spacing={3}>
        {questionFields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              position: 'relative',
              width: '100%',
              '&:before': isShowPasteBar(field.id) ? pasteBarSx : {},
            }}
          >
            <QuestionCard
              sx={isTransparent(field.id) ? { opacity: 0.3 } : {}}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={(e) => handleDragEnter(index, e)}
              onDragEnd={handleDragEnd}
              ref={index === questionFields.length - 1 ? lastItemRef : null}
              isFromServer={field.isFromServer}
              key={field.id}
              questionIndex={index}
              type={watchedQuestions[index].type}
              onDelete={getDeleteFunc(index)}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default FormQuestionList;
