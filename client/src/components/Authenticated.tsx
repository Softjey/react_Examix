import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Routes from '../Routes';

interface Props {
  children: React.ReactNode;
}

const Authenticated: React.FC<Props> = ({ children }) => {
  const { data: user } = useAuth();

  if (!user) {
    return <Navigate to={Routes.LOGIN_PAGE} />;
  }

  return children;
};

export default Authenticated;
