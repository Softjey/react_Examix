import { CSSObject } from '@emotion/react';
import Logo from '../UI/Logo';
import BackButton from '../UI/buttons/BackButton';

interface Props {
  disableBackBtn?: boolean;
  style?: CSSObject;
  invertHeader?: boolean;
}

const Header: React.FC<Props> = ({ invertHeader, disableBackBtn, style }) => (
  <header css={{ position: 'relative', ...style }}>
    <Logo
      sx={{
        color: invertHeader ? 'white' : 'auto',
      }}
    />
    {!disableBackBtn && (
      <BackButton
        sx={{ position: 'absolute', transform: 'translateY(-50%)', top: '50%', left: '-95px' }}
        route=".."
      />
    )}
  </header>
);

export default Header;
