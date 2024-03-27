import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Answer } from '../temp/questions';

interface Props {
  answers: Answer[];
}

const Result: React.FC = ({ answers }): Props => {
  const navigate = useNavigate();
  return (
    <Box flexDirection="column" display="flex" gap="20px">
      <h1>Done</h1>
      <TableContainer component={Paper} sx={{ width: 650, height: 300 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>question id</TableCell>
              <TableCell>answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map((answer) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{answer.questionId}</TableCell>
                <TableCell align="right">{answer.answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button size="large" onClick={() => navigate(0)}>
        Restart
      </Button>
    </Box>
  );
};

export default Result;
