import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../hooks/queries/useAuth';
import Routes from '../../services/Router/Routes';
import LoadingPage from '../../pages/LoadingPage';

interface Props {
  children: React.ReactNode;
}

const OnlyPublic: React.FC<Props> = ({ children }) => {
  const { data: user, isLoading } = useAuth();

  if (user) {
    return <Navigate to={Routes.HOME} replace />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return children;
};

export default OnlyPublic;
