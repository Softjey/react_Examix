import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import renderOption from './renderOption';
import useTests from '../../../hooks/queries/useTests';
import { AutocompleteProps } from '../../../types/utils/AutocompleteProps';
import { Test } from '../../../types/api/entities/test';
import { ControlledProps } from '../../../types/utils/ControlledProps';

type OmittedProps =
  | 'ref'
  | 'value'
  | 'onBlur'
  | 'loading'
  | 'disabled'
  | 'options'
  | 'renderOption'
  | 'onChange'
  | 'renderInput'
  | 'isOptionEqualToValue'
  | 'getOptionLabel';

interface Props<T extends FieldValues>
  extends ControlledProps<T>,
    Omit<AutocompleteProps<Test>, OmittedProps> {
  label?: TextFieldProps['label'];
}

const TestsAutocomplete = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, label, controllerProps, ...restProps } = props;
  const { tests, isPending } = useTests({ limit: 20 });

  return (
    <Controller
      {...controllerProps}
      name={name}
      control={control}
      render={({ field }) => {
        const { onBlur, onChange, ref, value, disabled } = field;
        return (
          <Autocomplete
            ref={ref}
            value={value}
            onBlur={onBlur}
            loading={isPending}
            disabled={disabled}
            options={tests ?? []}
            renderOption={renderOption}
            onChange={(_, newValue) => onChange(newValue)}
            renderInput={(params) => <TextField name={name} label={label} {...params} />}
            isOptionEqualToValue={(option, query) => option.id === query?.id}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
            {...restProps}
          />
        );
      }}
    />
  );
};

export default TestsAutocomplete;
