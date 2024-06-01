import React, { useState } from 'react';
import { ButtonProps, DialogProps } from '@mui/material';
import Button from '../UI/buttons/Button';
import { TestQuestion } from '../../types/api/entities/testQuestion';
import { Answer } from '../../types/api/entities/question';
import { Nullable } from '../../types/utils/Nullable';
import QuestionDialog from './QuestionDialog';

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

      <QuestionDialog
        itemProps={{
          question,
          studentAnswers,
          index: questionIndex,
        }}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default QuestionsDialogButton;
