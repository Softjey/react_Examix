import {
  Autocomplete,
  AutocompleteInputChangeReason,
  AutocompleteProps,
  CircularProgress,
  TextField,
} from '@mui/material';
import React, { SyntheticEvent } from 'react';
import useGlobalSearch from '../../../hooks/queries/useGlobalSearch';
import { getOptionLabel, renderOption } from './renderOption';
import { GlobalSearchResult } from '../../../services/Api/types/global-search';

type AutoCompletePropsI = AutocompleteProps<GlobalSearchResult, boolean, boolean, boolean>;

interface Props extends Omit<AutoCompletePropsI, 'options' | 'renderInput'> {}

const GlobalSearchBar: React.FC<Props> = ({ onInputChange, ...rest }) => {
  const { search, data: results, isPending } = useGlobalSearch();
  const handleInputChange = (
    _: SyntheticEvent<Element, Event>,
    newQuery: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    search({ query: newQuery });
    onInputChange?.(_, newQuery, reason);
  };

  return (
    <Autocomplete
      freeSolo
      onInputChange={handleInputChange}
      loading={isPending}
      options={results ?? []}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search anything what you want"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isPending ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...rest}
    />
  );
};

export default GlobalSearchBar;
