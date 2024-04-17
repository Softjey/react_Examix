import { CSSObject } from '@emotion/react';
import { Typography } from '@mui/material';
import BackButton from './UI/buttons/BackButton';

interface Props {
  disableBackBtn?: boolean;
  style?: CSSObject;
}

const Header: React.FC<Props> = ({ disableBackBtn, style }) => (
  <header css={{ position: 'relative', ...style }}>
    <Typography fontSize={70} variant="h1" fontWeight={700}>
      Examix
    </Typography>
    {!disableBackBtn && (
      <BackButton
        style={{ position: 'absolute', transform: 'translateY(-50%)', top: '50%', left: '-95px' }}
      />
    )}
  </header>
);

export default Header;
