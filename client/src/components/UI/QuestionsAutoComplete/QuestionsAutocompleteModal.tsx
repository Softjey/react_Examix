import { Modal, Box, Autocomplete, ModalProps, Typography, Grow } from '@mui/material';
import { HTMLAttributes, useState } from 'react';
import { AutocompleteProps } from '../../../types/utils/AutocompleteProps';
import { Question } from '../../../types/api/entities/question';
import renderOption from './renderOption';

interface GrowingProps extends HTMLAttributes<HTMLElement> {
  autoCompleteOpen?: boolean;
}

const Growing: React.FC<GrowingProps> = ({ children, autoCompleteOpen }) => (
  <Grow in={autoCompleteOpen} timeout={300}>
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        boxShadow: 1,
        zIndex: 1300,
      }}
    >
      {children}
    </Box>
  </Grow>
);

interface Props extends Omit<ModalProps, 'children'> {
  autoCompleteProps: AutocompleteProps<Question>;
}

const QuestionsAutocompleteModal: React.FC<Props> = ({ open, onClose, autoCompleteProps }) => {
  const [autoCompleteOpen, setAutoCompleteOpen] = useState<boolean>(false);

  const { options, loading, onChange, renderInput, ...restAutoCompleteProps } = autoCompleteProps;

  const getGrowingComponent = (props: HTMLAttributes<HTMLElement>) => (
    <Growing autoCompleteOpen={autoCompleteOpen} {...props} />
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}
    >
      <Box
        sx={{
          width: '80dvh',
          maxWidth: '600px',
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 1,
          minHeight: autoCompleteOpen ? 520 : 0,
          marginTop: 16,
          transition: 'min-height 0.3s ease 0.05s',
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
          PaperComponent={getGrowingComponent}
          {...restAutoCompleteProps}
        />
      </Box>
    </Modal>
  );
};

export default QuestionsAutocompleteModal;
