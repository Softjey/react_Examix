import { TextField, MenuItem, TextFieldProps } from '@mui/material';
import SubjectItem from '../../components/UI/SubjectItem';
import Subject from '../../types/api/Subject';
import { Nullable } from '../../types/utils/Nullable';

interface Props extends TextFieldProps<'standard'> {
  selectedSubject: Nullable<Subject>;
}

const SubjectSelect: React.FC<Props> = ({ selectedSubject, onChange, ...rest }) => {
  return (
    <TextField
      {...rest}
      value={selectedSubject || ''}
      onChange={onChange}
      select
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
