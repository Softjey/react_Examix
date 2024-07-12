import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';

type Props<T extends TextFieldVariants> = TextFieldProps<T>;

const TimeLimitPicker = <T extends TextFieldVariants>({ sx, ...props }: Props<T>) => {
  return (
    <TextField
      type="time"
      sx={{
        width: '127px',
        '.MuiInputBase-input': {
          paddingTop: 1,
          paddingBottom: 1,
        },
        '.MuiInputLabel-root': {
          top: '-8px',
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default TimeLimitPicker;
