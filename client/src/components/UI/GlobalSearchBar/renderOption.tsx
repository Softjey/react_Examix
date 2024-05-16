import { HTMLAttributes } from 'react';
import QuizIcon from '@mui/icons-material/Quiz';
import BookIcon from '@mui/icons-material/Book';
import HelpIcon from '@mui/icons-material/Help';
import { GlobalSearchResult } from '../../../services/Api/types/global-search';
import LinkListOption from '../LinkListOption';
import { trim } from '../../../utils/trim';

export const getOptionLabel = (result: GlobalSearchResult | string) => {
  if (typeof result === 'string') {
    return result;
  }

  return `${result.type}-${result.item.id}`;
};

export const getTitle = (result: GlobalSearchResult) => {
  switch (result.type) {
    case 'exam':
      return `Exam for ${result.item.test.name}`;
    case 'question':
      return result.item.title;
    case 'test':
      return result.item.name;
    default:
      throw new Error('Unknown option label type');
  }
};

export const getSubtitle = (result: GlobalSearchResult) => {
  switch (result.type) {
    case 'exam': {
      const dateStr = new Date(result.item.createdAt).toLocaleTimeString();
      const students = result.item.results.map((student) => student.studentName).join(', ');

      return `Created at ${dateStr}. Students: ${students}`;
    }
    case 'question': {
      const subjectStr = result.item.subject ? `Subject: ${result.item.subject}.` : '';

      return `${subjectStr} Type: ${result.item.type}.`;
    }
    case 'test': {
      const subjectStr = result.item.subject ? `Subject: ${result.item.subject}.` : '';

      return `${subjectStr} Description: ${result.item.description}.`;
    }
    default:
      throw new Error('Unknown option label type');
  }
};

export const getIcon = (result: GlobalSearchResult) => {
  switch (result.type) {
    case 'exam':
      return <BookIcon />;
    case 'question':
      return <HelpIcon />;
    case 'test':
      return <QuizIcon />;
    default:
      throw new Error('Unknown option label type');
  }
};

export const getHref = (result: GlobalSearchResult) => {
  return `/have_to_implement_${result.type}_link`;
};

export const renderOption = (props: HTMLAttributes<HTMLLIElement>, result: GlobalSearchResult) => (
  <LinkListOption
    title={trim(getTitle(result), 60)}
    subtitle={trim(getSubtitle(result), 66)}
    icon={getIcon(result)}
    to={getHref(result)}
    style={{ padding: '0' }}
    {...props}
  />
);
