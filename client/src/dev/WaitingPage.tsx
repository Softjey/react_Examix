import { useState } from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  PaperProps,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StartLayout from '../components/StartLayout';
import Button from '../components/UI/buttons/Button';

// eslint-disable-next-line react/jsx-props-no-spreading
const OutlinedPaper: React.FC<PaperProps> = (props) => <Paper variant="outlined" {...props} />;

interface Props {
  students: string[];
}
const StudentsListCard: React.FC<Props> = ({ students }) => (
  <Card
    sx={{
      padding: '25px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}
  >
    <List
      sx={{
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'space-between',
        rowGap: '15px',
        width: '620px',
        maxHeight: '60vh',
      }}
    >
      {students.map((student) => (
        <ListItem component={OutlinedPaper} sx={{ width: '300px' }}>
          <ListItemAvatar>
            <PersonIcon />
          </ListItemAvatar>
          <ListItemText primary={student} />
        </ListItem>
      ))}
    </List>
    <Button variant="contained" sx={{ alignSelf: 'end' }} size="large" color="error">
      Leave
    </Button>
  </Card>
);

const WaitingPage: React.FC = () => {
  const [students, setStudents] = useState<string[]>([]);
  setStudents([...students]); // test fragment for eslint not to rugatsa

  return (
    <StartLayout header={false}>
      <Typography variant="h4">Waiting for the test to start ...</Typography>
      <StudentsListCard
        students={[
          'Maksim',
          'Test',
          'Maksim',
          'Test',
          'Maksim',
          'Test',
          'Maksim',
          'Test',
          'Maksim',
          'Test',
          'Test',
          'Test',
          'Test',
        ]}
      />
    </StartLayout>
  );
};

export default WaitingPage;
