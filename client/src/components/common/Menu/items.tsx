import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Routes from '../../../services/Router/Routes';

export type MenuItemType = {
  text: string;
  icon: React.ReactElement;
  url: Routes;
};

export type ItemsParams = { ongoingExam?: boolean };

export const getItems = ({ ongoingExam }: ItemsParams): MenuItemType[] => {
  const items = [
    {
      text: 'Exams history',
      icon: <WorkHistoryIcon />,
      url: Routes.EXAMS_HISTORY,
    },
    {
      text: 'Tests library',
      icon: <AutoStoriesIcon />,
      url: Routes.TESTS_LIBRARY,
    },
    {
      text: 'Create test',
      icon: <LibraryAddIcon />,
      url: Routes.CREATE_TEST,
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      url: Routes.SETTINGS,
    },
  ];

  if (ongoingExam) {
    items.splice(0, 0, {
      icon: <TimelapseIcon color="error" />,
      text: 'Ongoing exam',
      url: Routes.ONGOING_EXAM_PANEL,
    });
  }

  return items;
};
