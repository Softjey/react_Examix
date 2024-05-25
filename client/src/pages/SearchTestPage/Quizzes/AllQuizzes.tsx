import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TestCard from './TestCard';
import useTests from '../../../hooks/queries/useTests';
import Subject from '../../../types/api/Subject';

const theme = createTheme();

const AllQuizzes: React.FC = () => {
  const { tests, isLoading, isError } = useTests({ limit: 2 });
  const [selectedSubject, setSelectedSubject] = useState<string>(''); // Set default value to empty string

  const handleSubjectChange = (event: SelectChangeEvent<string>) => {
    setSelectedSubject(event.target.value);
  };

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
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={10}>
              <TextField
                label="Search..."
                variant="standard"
                fullWidth
                InputProps={{ endAdornment: <SearchIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSubject}
                  label="Subject"
                  onChange={handleSubjectChange}
                >
                  <MenuItem value="">All</MenuItem>
                  {Object.keys(Subject).map((key) => (
                    <MenuItem
                      key={Subject[key as keyof typeof Subject]}
                      value={Subject[key as keyof typeof Subject]}
                    >
                      {Subject[key as keyof typeof Subject]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
