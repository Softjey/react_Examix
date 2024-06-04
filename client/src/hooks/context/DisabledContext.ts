import { createContext } from 'react';

interface DisabledContextProps {
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisabledContext = createContext<DisabledContextProps | null>(null);

export default DisabledContext;
