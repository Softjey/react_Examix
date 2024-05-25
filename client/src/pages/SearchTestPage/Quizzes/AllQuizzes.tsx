import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import TestCard from './TestCard';
import { Test } from '../../../types/api/test';
import Subject from '../../../types/api/Subject';
import test1Image from '../../../img/test1.jpg';
import test2Image from '../../../img/test2.jpg';
import test3Image from '../../../img/test3.jpg';

const mockTests: Test[] = [
  {
    id: 1,
    name: 'Cats',
    image: test1Image,
    description: 'Test for 2P from ZSE w Gdańsku',
    subject: Subject.BIOLOGY,
    authorId: 1,
    createdAt: '2024-05-21T00:00:00Z',
  },
  {
    id: 2,
    name: 'Top 10 poses for yoga for date with your beloved and beautiful person',
    image: test2Image,
    description: "an interesting idea for a date, it's relaxing yoga ",
    subject: Subject.SPORT,
    authorId: 2,
    createdAt: '2024-05-21T00:00:00Z',
  },
  {
    id: 3,
    name: 'Flowers',
    image: test3Image,
    description:
      'test your knowledge about types of flowers, interesting facts about flowers and their uniqueness to improve your knowledge about plants',
    subject: Subject.GEOGRAPHY,
    authorId: 1,
    createdAt: '2024-05-21T00:00:00Z',
  },
];

const theme = createTheme();

const AllQuizzes: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ p: '16px' }}>
        <TextField
          label="Search..."
          variant="standard"
          fullWidth
          InputProps={{ endAdornment: <SearchIcon /> }}
        />
      </Box>
      <Grid container spacing={2} sx={{ p: '16px' }}>
        {mockTests.map((test) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={test.id}>
            <TestCard test={test} />
          </Grid>
        ))}
      </Grid>
    </Box>
  </ThemeProvider>
);

export default AllQuizzes;
