import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';

export type SelectProps<T extends TextFieldVariants> = Omit<TextFieldProps<T>, 'select'>;

const Select = <T extends TextFieldVariants>({ SelectProps, ...rest }: SelectProps<T>) => {
  return (
    <TextField
      select
      SelectProps={{
        ...SelectProps,
        MenuProps: {
          disableScrollLock: true,
          ...SelectProps?.MenuProps,
        },
      }}
      {...rest}
    />
  );
};

export default Select;
