import { Box } from '@mui/material';
import QuestionCard from './components/QuestionCard';

interface Props {}

const CreateTestPage: React.FC<Props> = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <QuestionCard />
    </Box>
  );
};

export default CreateTestPage;
