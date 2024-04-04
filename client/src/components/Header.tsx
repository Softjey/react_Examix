import { CSSObject } from '@emotion/react';
import BackButton from './UI/buttons/BackButton';

interface Props {
  disableBackBtn?: boolean;
  style?: CSSObject;
}

const Header: React.FC<Props> = ({ disableBackBtn, style }) => (
  <header css={{ position: 'relative', ...style }}>
    <h1>Examix</h1>
    {!disableBackBtn && (
      <BackButton
        style={{ position: 'absolute', transform: 'translateY(-50%)', top: '50%', left: '-70px' }}
      />
    )}
  </header>
);

export default Header;
