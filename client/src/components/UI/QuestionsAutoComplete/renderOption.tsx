import { Stack, Chip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import LinkListOption from '../LinkListOption';
import SubjectItem from '../SubjectItem/SubjectItem';
import { trim } from '../../../utils/trim';
import underscoreToUpperToSentence from '../../../utils/underscoreToUpperToSentence';
import { AutocompleteProps } from '../../../types/utils/AutocompleteProps';
import { Question } from '../../../types/api/entities/question';

const renderOption: AutocompleteProps<Question>['renderOption'] = (
  { ...rest },
  question: Question,
) => {
  return (
    <LinkListOption
      key={question.id}
      title={trim(question.title, 60)}
      subtitle={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip color="primary" size="small" label={question.id} />
          {question.subject && (
            <SubjectItem
              variant="chip"
              chipColor="default"
              chipVariant="outlined"
              subject={question.subject}
            />
          )}
          <Chip size="small" label={underscoreToUpperToSentence(question.type)} />
        </Stack>
      }
      icon={<HelpIcon />}
      style={{ padding: '0' }}
      {...rest}
    />
  );
};

export default renderOption;
