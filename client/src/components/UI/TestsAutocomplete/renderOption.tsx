import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { AutocompletePropsType } from './AutocompletePropsType';
import { Test } from '../../../types/api/test';
import TestAvatar from '../TestAvatar';
import SubjectItem from '../SubjectItem';
import { textEllipsis } from '../../../styles/text';

const renderOption: AutocompletePropsType['renderOption'] = ({ ...rest }, test: Test) => {
  return (
    <ListItem {...rest}>
      <ListItemAvatar>
        <TestAvatar image={test.image} name={test.name} width={40} />
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
