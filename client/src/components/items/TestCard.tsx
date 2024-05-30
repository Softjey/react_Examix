import React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Test } from '../../types/api/entities/test';
import SubjectItem from '../UI/SubjectItem/SubjectItem';
import TestAvatar from '../UI/TestAvatar';
import { textMultilineEllipsis } from '../../styles/text';
import { SxTheme } from '../../types/utils/SxTheme';
import Routes from '../../services/Router/Routes';

export interface TestCardProps extends CardProps {
  test: Test;
}

const cardSx: SxTheme = {
  display: 'flex',
  flexDirection: 'column',
  height: '360px',
};

const TestCard: React.FC<TestCardProps> = ({ test, sx, ...rest }) => {
  const { id, name, description, subject } = test;

  return (
    <Card sx={{ ...cardSx, ...sx }} component="article" {...rest}>
      <Link to={`${Routes.TEST}/${id}`}>
        <Box sx={{ position: 'relative' }}>
          <TestAvatar logoFontSize={60} width="100%" test={test} />

          <SubjectItem
            variant="chip"
            textVariant="caption"
            chipVariant="outlined"
            subject={subject}
            sx={{ position: 'absolute', bottom: 10, left: 10, userSelect: 'none' }}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.inherit" sx={textMultilineEllipsis(2)}>
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary" mt={1} sx={textMultilineEllipsis(3)}>
            {description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default TestCard;
