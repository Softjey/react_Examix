import { Box, TextField } from '@mui/material';
import SubjectItem from '../../components/UI/SubjectItem';

interface Props {}

const TestInfo: React.FC<Props> = () => {
  return (
    <Box>
      <TextField type="text" label="Test name" />
      <TextField select label="Subject">
        <SubjectItem />
      </TextField>
      <TextField type="text" label="Test name" />
    </Box>
  );
};

export default TestInfo;
