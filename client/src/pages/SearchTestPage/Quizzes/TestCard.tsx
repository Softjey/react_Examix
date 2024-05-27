import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Test } from '../../../types/api/entities/test';
import SubjectItem from '../../../components/UI/SubjectItem/SubjectItem';
import TestAvatar from '../../../components/UI/TestAvatar';

interface TestCardProps {
  test: Test;
}

const TestCard: React.FC<TestCardProps> = ({ test }) => (
  <Card
    sx={{ minWidth: '200px', width: '100%', minHeight: '100px', height: '100%', maxWidth: '300px' }}
  >
    <Box sx={{ position: 'relative' }}>
      <TestAvatar width={300} test={test} />
      <SubjectItem
        variant="chip"
        textVariant="caption"
        chipVariant="outlined"
        subject={test.subject}
        sx={{ position: 'absolute', bottom: 10, left: 10, userSelect: 'none' }}
      />
    </Box>
    <CardContent>
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
        {test.name}
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
        {test.description}
      </Typography>
    </CardContent>
  </Card>
);

export default TestCard;
