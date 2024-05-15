import React from 'react';
import { CircularProgress } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/queries/useAuth';
import Routes from '../services/Router/Routes';
import StartLayout from './layouts/StartLayout';

interface Props {
  children: React.ReactNode;
}

const Authenticated: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <StartLayout>
        <CircularProgress size={60} css={{ marginTop: '30px' }} />
      </StartLayout>
    );
  }

  if (!user) {
    return <Navigate to={Routes.LOGIN} state={{ redirect: location.pathname }} replace />;
  }

  return children;
};

export default Authenticated;
