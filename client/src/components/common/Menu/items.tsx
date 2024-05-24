import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import Routes from '../../../services/Router/Routes';

export type MenuItemType = {
  text: string;
  icon: React.ReactElement;
  url: Routes;
};

export const items: MenuItemType[] = [
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
