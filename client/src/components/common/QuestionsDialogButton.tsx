import React, { useState } from 'react';
import { ButtonProps, Dialog, DialogProps } from '@mui/material';
import Button from '../UI/buttons/Button';
import QuestionItem from '../UI/QuestionItem';
import { TestQuestion } from '../../types/api/entities/testQuestion';
import { Answer } from '../../types/api/entities/question';
import { Nullable } from '../../types/utils/Nullable';

interface Props extends ButtonProps {
  dialogProps?: DialogProps;
  question: TestQuestion;
  studentAnswers?: Nullable<Pick<Answer, 'title'>[]>;
  questionIndex: number;
}

const QuestionsDialogButton: React.FC<Props> = ({
  dialogProps,
  question,
  studentAnswers,
  questionIndex,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} {...rest} />

      <Dialog
        maxWidth="md"
        {...dialogProps}
        PaperProps={{
          sx: { p: 4, borderRadius: 1.5 },
          ...dialogProps?.PaperProps,
        }}
        onClose={handleClose}
        open={open}
        disableScrollLock
      >
        <QuestionItem index={questionIndex} question={question} studentAnswers={studentAnswers} />
      </Dialog>
    </>
  );
};

export default QuestionsDialogButton;
