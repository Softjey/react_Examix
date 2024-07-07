import { MenuItem, TextFieldProps, TextFieldVariants } from '@mui/material';
import SubjectItem from './SubjectItem/SubjectItem';
import Subject from '../../types/api/enums/Subject';
import Select from './Select';

type Props<T extends TextFieldVariants> = TextFieldProps<T> & {
  maxHeight?: number;
  otherMenuItems?: React.ReactNode;
};

const SubjectSelect = <T extends TextFieldVariants>(props: Props<T>) => {
  const { maxHeight = 200, otherMenuItems, ...rest } = props;

  return (
    <Select
      {...rest}
      defaultValue=""
      label="Subject"
      SelectProps={{
        sx: {
          maxHeight: 56,
        },
        MenuProps: {
          PaperProps: {
            style: { maxHeight },
          },
        },
      }}
    >
      {otherMenuItems}
      {Object.values(Subject).map((subject) => (
        <MenuItem key={subject} value={subject}>
          <SubjectItem textVariant="body1" subject={subject} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default SubjectSelect;
