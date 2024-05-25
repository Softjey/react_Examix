import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Test } from '../../../types/api/test';

interface TestCardProps {
  test: Test;
}

const TestCard: React.FC<TestCardProps> = ({ test: { image, subject, name, description } }) => (
  <Card
    sx={{ minWidth: '200px', width: '100%', minHeight: '100px', height: '100%', maxWidth: '300px' }}
  >
    <Box
      sx={{
        width: '100%',
        height: '140px',
        backgroundImage: `url(${image || './img/test1.jpg'})`,
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <Chip
        label={subject}
        size="small"
        sx={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      />
      <Chip
        label="12p"
        size="small"
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
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
