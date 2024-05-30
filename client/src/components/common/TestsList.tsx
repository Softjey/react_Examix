import React from 'react';
import { Alert, Box, BoxProps, CircularProgress } from '@mui/material';
import TestCard from '../items/TestCard';
import { Test } from '../../types/api/entities/test';
import { center } from '../../styles/flex';

export interface TestsListProps extends BoxProps {
  tests?: Test[];
  error?: string;
  isLoading?: boolean;
}

const TestsList: React.FC<TestsListProps> = ({ tests, sx, error, isLoading, ...rest }) => {
  if (error) {
    return (
      <Alert severity="error" sx={sx}>
        {error}
      </Alert>
    );
  }

  if (isLoading || !tests) {
    return (
      <Box sx={{ ...center, ...sx }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!tests.length) {
    return (
      <Alert severity="info" sx={sx}>
        No tests found
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 300px)',
        justifyContent: 'center',
        gap: 4,
        ...sx,
      }}
      component="section"
      {...rest}
    >
      {tests.map((test) => (
        <TestCard key={test.id} test={test} />
      ))}
    </Box>
  );
};

export default TestsList;
