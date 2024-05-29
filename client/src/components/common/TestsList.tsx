import React from 'react';
import { Box } from '@mui/material';
import TestCard from '../items/TestCard';
import { Test } from '../../types/api/entities/test';

interface TestsListProps {
  tests: Test[];
}

const TestsList: React.FC<TestsListProps> = ({ tests }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        justifyContent: 'center',
        marginTop: '32px',
        gap: '20px',
      }}
    >
      {tests.map((test) => (
        <TestCard key={test.id} test={test} />
      ))}
    </Box>
  );
};

export default TestsList;
