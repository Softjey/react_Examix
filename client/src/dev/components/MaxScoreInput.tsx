import { TextField, TextFieldProps, Typography } from '@mui/material';

interface Props extends TextFieldProps<'standard'> {
  maxScore: number;
}

const MaxScoreInput: React.FC<Props> = (props) => {
  return (
    <TextField
      value={props.maxScore}
      onChange={props.onChange}
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
      {...props}
    />
  );
};

export default MaxScoreInput;
