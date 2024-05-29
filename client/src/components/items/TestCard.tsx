import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Test } from '../../types/api/entities/test';
import SubjectItem from '../UI/SubjectItem/SubjectItem';
import TestAvatar from '../UI/TestAvatar';

interface TestCardProps {
  test: Test;
}

const TestCard: React.FC<TestCardProps> = ({ test, test: { name, description, subject } }) => (
  <Card
    sx={{
      width: '250px',
      minHeight: '100px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box sx={{ position: 'relative' }}>
      <TestAvatar width={250} test={test} />

      <SubjectItem
        variant="chip"
        textVariant="caption"
        chipVariant="outlined"
        subject={subject}
        sx={{ position: 'absolute', bottom: 10, left: 10, userSelect: 'none' }}
      />
    </Box>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography
        variant="body2"
        color="text.inherit"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 2,
          lineClamp: 2,
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 3,
          lineClamp: 3,
        }}
      >
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default TestCard;
