import * as React from 'react';
import { CSSObject } from '@emotion/react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import useTests from '../../hooks/queries/useTests';
import Subject from '../../types/api/Subject';
import TestsList from './Quizzes/TestsList';

const styles: Record<string, CSSObject> = {
  container: {
    display: 'flex',
    height: '100vh',
    boxSizing: 'border-box',
  },
};

const TestsLibraryPage: React.FC = () => {
  const { tests, isLoading, isError } = useTests({ limit: 2 });
  const [selectedAge, setSelectedAge] = useState('');

  const handleAgeChange = (event: SelectChangeEvent<string>) => {
    setSelectedAge(event.target.value);
  };

  if (isLoading || !tests) {
    return <h1>loading...</h1>;
  }
  if (isError || !tests) {
    return <h1>error</h1>;
  }
  return (
    <div css={styles.container}>
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
                  value={selectedAge}
                  label="Subject"
                  onChange={handleAgeChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  {Object.values(Subject).map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <TestsList tests={tests} />
      </Box>
    </div>
  );
};

export default TestsLibraryPage;
