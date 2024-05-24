import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Test } from '../../../types/api/entities/test';
import TestAvatar from '../TestAvatar';
import SubjectItem from '../SubjectItem';
import { textEllipsis } from '../../../styles/text';
import { AutocompleteProps } from '../../../types/utils/AutocompleteProps';

const renderOption: AutocompleteProps<Test>['renderOption'] = ({ ...rest }, test: Test) => {
  return (
    <ListItem {...rest}>
      <ListItemAvatar>
        <TestAvatar test={test} width={40} />
      </ListItemAvatar>
      <ListItemText
        sx={{ marginBlock: '0' }}
        primary={
          <Typography variant="body2" sx={{ maxWidth: '100%', ...textEllipsis }}>
            {test.name}
          </Typography>
        }
        secondary={<SubjectItem subject={test.subject} endText={test.description} />}
      />
    </ListItem>
  );
};

export default renderOption;
