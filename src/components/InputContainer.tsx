interface Props {
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
const InputContainer: React.FC<Props> = ({ children }) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '300px',
    }}
  >
    {children}
  </div>
);

export default InputContainer;
