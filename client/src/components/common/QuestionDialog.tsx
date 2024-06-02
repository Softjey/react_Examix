import { Dialog, DialogProps } from '@mui/material';
import React from 'react';
import QuestionItem, { Props as QuestionItemProps } from '../UI/QuestionItem';

interface Props extends DialogProps {
  itemProps: QuestionItemProps;
}

const QuestionDialog: React.FC<Props> = ({ itemProps, PaperProps, ...rest }) => {
  return (
    <Dialog
      maxWidth="md"
      PaperProps={{
        sx: { p: 4, borderRadius: 1.5 },
        ...PaperProps,
      }}
      disableScrollLock
      {...rest}
    >
      <QuestionItem {...itemProps} />
    </Dialog>
  );
};

export default QuestionDialog;
