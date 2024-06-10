import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/queries/useAuth';
import Routes from '../../services/Router/Routes';
import LoadingPage from '../../pages/LoadingPage';
import { usePinCode } from '../../store/contexts/PinCodeContext';
import LockedPage from '../../pages/LockedPage';

interface Props {
  children: React.ReactNode;
}

const Authenticated: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { isLocked } = usePinCode();
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to={Routes.LOGIN} state={{ redirect: location.pathname }} replace />;
  }

  if (isLocked) {
    return <LockedPage />;
  }

  return children;
};

export default Authenticated;
