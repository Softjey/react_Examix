import React, { ComponentProps, useState } from 'react';
import { usePinCode } from '../store/contexts/PinCodeContext';

interface Props extends ComponentProps<'div'> {}

const LockedPage: React.FC<Props> = ({ ...rest }) => {
  const [value, setValue] = useState('');

  const { unlock } = usePinCode();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    unlock(value);
  };

  return (
    <div {...rest}>
      <h1>Locked page</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setValue(e.target.value)} value={value} />
      </form>
    </div>
  );
};

export default LockedPage;
