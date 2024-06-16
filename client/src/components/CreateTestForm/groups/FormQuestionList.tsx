import { Box, BoxProps, Stack, Typography } from '@mui/material';
import { FieldArrayWithId } from 'react-hook-form';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CreateTestFormType } from '../schemas/createTestFormValidationSchemas';
import QuestionCard from '../items/QuestionCard';
import useCreateTestForm from '../../../hooks/useCreateTestForm';

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

  const [pasteId, setPasteId] = useState<string | null>(null);
  const [transparentId, setTransparentId] = useState<string | null>(null);

  const watchedQuestions = watch('questions');

  const dragItem = useRef<number>();
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (position: number) => {
    dragItem.current = position;
    setTransparentId(questionFields[position].id);
  };

  const handleDragEnter = (position: number, e: React.DragEvent<HTMLDivElement>) => {
    dragOverItem.current = position;

    if (e.dataTransfer.types.length > 0) {
      return;
    }

    setPasteId(questionFields[position].id);
  };

  const handleDragEnd = () => {
    setPasteId(null);
    setTransparentId(null);

    const itemToMove = [...watchedQuestions][dragItem.current!];

    const questionsWithoutItemToMove = [...watchedQuestions].filter(
      (_, index) => index !== dragItem.current!,
    );

    const reorderedQuestions = [
      ...questionsWithoutItemToMove.slice(0, dragOverItem.current!),
      itemToMove,
      ...questionsWithoutItemToMove.slice(dragOverItem.current!),
    ];

    dragItem.current = dragOverItem.current!;
    dragOverItem.current = null;

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

          const showPasteBar = pasteId === field.id;
          const isTransparent = transparentId === field.id;

          return (
            <Box
              key={field.id}
              position="relative"
              sx={{
                width: '100%',
                ':before': showPasteBar
                  ? {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      top: -13,
                      height: '3px',
                      backgroundColor: (theme) => theme.palette.info.main,
                    }
                  : {},
              }}
            >
              <QuestionCard
                sx={
                  isTransparent
                    ? {
                        opacity: 0.3,
                      }
                    : {}
                }
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
