import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { SxProps, Theme } from '@mui/material';
import MenuHeader from './MenuHeader';
import MenuFooter from './MenuFooter';
import MenuList from './MenuList';

export interface Props extends Partial<DrawerProps> {
  width: number;
}

export const Menu: React.FC<Props> = ({ width, sx, ...rest }) => {
  const drawerSx: SxProps<Theme> = {
    width,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '24px',
      width,
      boxSizing: 'border-box',
    },
    ...sx,
  };

  return (
    <Drawer variant="permanent" sx={drawerSx} {...rest}>
      <section>
        <MenuHeader />
        <Divider />
        <MenuList />
      </section>

      <section>
        <Divider />
        <MenuFooter />
      </section>
    </Drawer>
  );
};
