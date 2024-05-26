import { TextField, MenuItem, TextFieldProps } from '@mui/material';
import SubjectItem from '../../components/UI/SubjectItem';
import Subject from '../../types/api/Subject';

interface Props extends TextFieldProps<'standard'> {}

const SubjectSelect: React.FC<Props> = ({ ...props }) => {
  return (
    <TextField
      {...props}
      select
      defaultValue=""
      label="Subject"
      SelectProps={{
        sx: {
          maxHeight: 56,
        },
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        },
      }}
    >
      <MenuItem value="">No subject</MenuItem>
      {Object.values(Subject).map((subject) => (
        <MenuItem key={subject} value={subject}>
          <SubjectItem typographyProps={{ variant: 'body1' }} subject={subject} />
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SubjectSelect;
