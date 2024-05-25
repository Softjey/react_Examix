import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import TestCard from './TestCard';
import useTests from '../../../hooks/queries/useTests';

const theme = createTheme();

const AllQuizzes: React.FC = () => {
  const { tests, isLoading, isError } = useTests({ limit: 2 });
  if (isLoading || !tests) {
    return <h1>loading...</h1>;
  }
  if (isError || !tests) {
    return <h1>error</h1>;
  }
  return (
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
          {tests.map((test) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={test.id}>
              <TestCard test={test} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default AllQuizzes;
