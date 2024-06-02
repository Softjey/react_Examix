import { CSSObject } from '@emotion/react';
import BackButton from '../UI/buttons/BackButton';
import Logo from '../UI/Logo';

interface Props {
  disableBackBtn?: boolean;
  style?: CSSObject;
}

const Header: React.FC<Props> = ({ disableBackBtn, style }) => (
  <header css={{ position: 'relative', ...style }}>
    <Logo />
    {!disableBackBtn && (
      <BackButton
        sx={{ position: 'absolute', transform: 'translateY(-50%)', top: '50%', left: '-95px' }}
        route=".."
      />
    )}
  </header>
);

export default Header;
