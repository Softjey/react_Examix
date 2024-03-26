import BackButton from './UI/buttons/BackButton';

interface Props {
  disableBackBtn?: boolean;
}

const Header: React.FC<Props> = ({ disableBackBtn }) => (
  <header css={{ position: 'relative' }}>
    <h1>Examix</h1>
    {!disableBackBtn && <BackButton />}
  </header>
);

export default Header;
