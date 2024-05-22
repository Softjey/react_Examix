import { TextField, TextFieldProps, Typography } from '@mui/material';

interface Props extends TextFieldProps<'standard'> {
  maxScore: number;
}

const MaxScoreInput: React.FC<Props> = ({ maxScore, ...rest }) => {
  return (
    <TextField
      value={maxScore}
      onChange={rest.onChange}
      type="text"
      size="small"
      sx={{ maxWidth: '80px' }}
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
    />
  );
};

export default MaxScoreInput;
