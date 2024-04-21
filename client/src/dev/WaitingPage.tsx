import { Typography } from '@mui/material';
import StartLayout from '../components/StartLayout';
import Button from '../components/UI/buttons/Button';
import BookLoader from './BookLoader/BookLoader';
import DottedText from './DottedText/DottedText';

const WaitingPage: React.FC = () => (
  <StartLayout header={false}>
    <BookLoader />
    <Typography sx={{ fontWeight: '500' }} variant="h2">
      <DottedText text="Waiting for the test to start" />
    </Typography>
    {/* <Typography sx={{ fontWeight: '500' }} variant="h1">Please wait</Typography>
        <Typography variant="h4">for the teacher to begin the test</Typography> */}
    <Button variant="contained" size="large" color="error">
      Leave
    </Button>
  </StartLayout>
);

export default WaitingPage;
