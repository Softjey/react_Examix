import { Stack, TextField, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import LoadingPage from '../../pages/LoadingPage';
import QuestionsAutocompleteModal from '../UI/QuestionsAutoComplete/QuestionsAutocompleteModal';
import LoadingButton from '../UI/buttons/LoadingButton';
import TestInfo from './TestInfo';
import FormQuestionList from './groups/FormQuestionList';
import Button from '../UI/buttons/Button';
import AlertSnackbar from '../UI/AlertSnackbar';
import useCreateTestPage from './useCreateTestPage';

interface Props {}

const CreateTestForm: React.FC<Props> = () => {
  const {
    loading,
    isQuestionsAutocompleteLoading,
    methods,
    onSubmit,
    shouldScroll,
    fields,
    remove,
    addQuestionCard,
    isModalOpened,
    error,
    reset,
    warningMessage,
    handleWarningClose,
    questions,
    search,
    handleSearchChange,
    openQuestionsLibraryModal,
    closeQuestionsLibraryModal,
    handleQuestionsAutocompleteChange,
  } = useCreateTestPage();

  if (loading) {
    return <LoadingPage layout="home" />;
  }

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        noValidate
        onSubmit={onSubmit}
        alignItems="center"
        padding="15px 30px"
        gap="32px"
      >
        <TestInfo />

        <Typography sx={{ width: '100%' }} variant="h6">
          Questions
        </Typography>

        <FormQuestionList
          shouldScroll={shouldScroll}
          width="100%"
          questionFields={fields}
          onRemove={remove}
        />

        <Stack width="100%" direction="row" justifyContent="start" gap={2}>
          <Button
            sx={{ textTransform: 'none' }}
            variant="outlined"
            color="secondary"
            disabled={loading}
            type="button"
            onClick={addQuestionCard}
          >
            Add new question
          </Button>

          <Button
            sx={{ textTransform: 'none' }}
            variant="outlined"
            color="secondary"
            disabled={loading}
            type="button"
            onClick={openQuestionsLibraryModal}
          >
            Add question from library
          </Button>
        </Stack>

        <LoadingButton variant="contained" size="large" type="submit" loading={loading}>
          Create Test
        </LoadingButton>
      </Stack>

      <AlertSnackbar severity="error" open={!!error} onClose={reset}>
        {error?.message || 'Error occurred'}
      </AlertSnackbar>

      <AlertSnackbar severity="warning" open={warningMessage !== null} onClose={handleWarningClose}>
        {warningMessage}
      </AlertSnackbar>

      <QuestionsAutocompleteModal
        open={isModalOpened}
        onClose={closeQuestionsLibraryModal}
        autoCompleteProps={{
          options: questions || [],
          onChange: handleQuestionsAutocompleteChange,
          loading: isQuestionsAutocompleteLoading,
          renderInput: (params) => (
            <TextField
              autoFocus
              placeholder="Question"
              value={search}
              onChange={handleSearchChange}
              {...params}
            />
          ),
        }}
      />
    </FormProvider>
  );
};

export default CreateTestForm;
