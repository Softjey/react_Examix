import * as React from 'react';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Subject from '../../types/api/enums/Subject';

const SearchAndSelect: React.FC = () => {
  const [selectedSearchAndSelect, setSelectedSearchAndSelect] = useState('');

  const handleAgeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSearchAndSelect(event.target.value);
  };

  return (
    <Stack direction="row" spacing={6} alignItems="center">
      <TextField
        label="Search..."
        variant="standard"
        fullWidth
        InputProps={{ endAdornment: <SearchIcon /> }}
      />
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSearchAndSelect}
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
    </Stack>
  );
};

export default SearchAndSelect;
