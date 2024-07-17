import { CSSObject } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import Logo from '../UI/Logo';
import BackButton from '../UI/buttons/BackButton';

interface Props {
  disableBackBtn?: boolean;
  style?: CSSObject;
}

const Header: React.FC<Props> = ({ disableBackBtn, style }) => {
  const matches = useMediaQuery('(max-width: 500px)');

  return (
    <header css={{ position: 'relative', ...style }}>
      <Logo />
      {!disableBackBtn && !matches && (
        <BackButton
          sx={{ position: 'absolute', transform: 'translateY(-50%)', top: '50%', left: '-95px' }}
          route=".."
        />
      )}
    </header>
  );
};

export default Header;
