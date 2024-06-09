import { TextField, TextFieldProps, Typography } from '@mui/material';
import { forwardRef } from 'react';

interface Props extends TextFieldProps<'standard'> {}

const MaxScoreInput = forwardRef<HTMLInputElement, Props>(({ sx, ...rest }, ref) => {
  return (
    <TextField
      type="text"
      size="small"
      sx={{ maxWidth: '80px', ...sx }}
      inputMode="numeric"
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <Typography color="text.secondary" sx={{ marginRight: '-4px' }} variant="body2">
            pts
          </Typography>
        ),
        inputProps: {
          maxLength: 3,
        },
      }}
      {...rest}
      inputRef={ref}
    />
  );
});

export default MaxScoreInput;
