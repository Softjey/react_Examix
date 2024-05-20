import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Test } from '../../../types/api/test';
import { AutocompletePropsType } from './AutocompletePropsType';
import useTestsAutocomplete from './useTestsAutocomplete';
import renderOption from './renderOption';

interface Props extends Omit<AutocompletePropsType, 'options' | 'renderInput'> {
  initialTestId?: Test['id'];
  name?: string;
}

const TestsAutocomplete: React.FC<Props> = ({ initialTestId, name, ...rest }) => {
  // eslint-disable-next-line operator-linebreak
  const { query, testId, tests, isPending, onChange, updateInput } =
    useTestsAutocomplete(initialTestId);

  return (
    <>
      <input type="hidden" name={name} value={testId} />
      <Autocomplete
        loading={isPending}
        onChange={onChange}
        renderOption={renderOption}
        onInputChange={updateInput}
        value={query}
        options={tests ?? []}
        renderInput={(params) => <TextField label="Test" {...params} />}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
        filterOptions={(x) => x}
        {...rest}
      />
    </>
  );
};

export default TestsAutocomplete;
