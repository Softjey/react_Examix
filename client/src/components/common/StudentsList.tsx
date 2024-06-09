import { CircularProgress, ListItemAvatar, ListItemText } from '@mui/material';
import { ListProps, Paper, Stack } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { IconButton, List, ListItem } from '@mui/material';
import React from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../UI/UserAvatar';
import Student from '../../store/ExamStore/types/Student';
import DottedText from '../UI/DottedText/DottedText';

interface Props extends ListProps {
  students: Student[];
  variant?: 'accordion' | 'list';
  onKick?: (student: Student) => void;
}

const StudentsList: React.FC<Props> = ({ students, variant, onKick, sx, ...rest }) => {
  const content = (
    <List
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 280px)',
        gridTemplateRows: 'repeat(auto-fit, 60px)',
        justifyContent: 'center',
        gap: 2,
        ...sx,
      }}
      {...rest}
    >
      {students.length === 0 && (
        <Stack height="100%" direction="row" spacing={5}>
          <DottedText variant="h6">Waiting for students</DottedText>
          <CircularProgress size={30} />
        </Stack>
      )}

      {students.length > 0 &&
        students.map(({ name, studentId }) => (
          <ListItem
            secondaryAction={
              onKick && (
                <IconButton onClick={() => onKick({ name, studentId })}>
                  <PersonRemoveIcon />
                </IconButton>
              )
            }
            component={Paper}
            variant="outlined"
            key={studentId}
          >
            <ListItemAvatar>
              <UserAvatar user={{ name, createdAt: studentId, photo: null }} />
            </ListItemAvatar>

            <ListItemText primary={name} />
          </ListItem>
        ))}
    </List>
  );

  return variant === 'accordion' ? (
    <Accordion variant="outlined" defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Show students</AccordionSummary>

      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  ) : (
    content
  );
};

export default StudentsList;
