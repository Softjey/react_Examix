import { Modal, Box, Autocomplete, ModalProps, Typography } from '@mui/material';
import { useState } from 'react';
import { AutocompleteProps } from '../../../types/utils/AutocompleteProps';
import { Question } from '../../../types/api/entities/question';
import renderOption from './renderOption';
import TransitionedPaperComponentForward from './TransitionedPaperComponentForward';

interface Props extends Omit<ModalProps, 'children'> {
  autoCompleteProps: AutocompleteProps<Question>;
}

const QuestionsAutocompleteModal: React.FC<Props> = ({ open, onClose, autoCompleteProps }) => {
  const [autoCompleteOpen, setAutoCompleteOpen] = useState<boolean>(false);

  const { options, loading, onChange, renderInput, ...restAutoCompleteProps } = autoCompleteProps;

  return (
    <Modal
      disableScrollLock
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}
    >
      <Box
        sx={{
          width: '80dvh',
          maxWidth: '600px',
          backgroundColor: (theme) => theme.palette.background.paper,
          padding: 4,
          borderRadius: 1,
          minHeight: autoCompleteOpen ? 520 : 0,
          marginTop: 16,
          transition: 'min-height 0.3s ease',
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" component="h2" marginBottom={1}>
          Search questions from the library
        </Typography>

        <Autocomplete
          fullWidth
          openOnFocus
          options={options}
          disablePortal
          onOpen={() => setAutoCompleteOpen(true)}
          onClose={() => setAutoCompleteOpen(false)}
          renderOption={renderOption}
          onChange={onChange}
          filterOptions={(x) => x}
          renderInput={renderInput}
          PaperComponent={TransitionedPaperComponentForward}
          {...restAutoCompleteProps}
        />
      </Box>
    </Modal>
  );
};

export default QuestionsAutocompleteModal;
