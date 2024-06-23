import React, { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import useForgotPassword from '../hooks/queries/useForgotPassword';
import useAuth from '../hooks/queries/useAuth';
import prettifyDuration from '../utils/time/prettifyDuration';
import LoadingButton from './UI/buttons/LoadingButton';
import { Nullable } from '../types/utils/Nullable';
import Routes from '../services/Router/Routes';
import useTimer from '../hooks/useTimer';

const ChangePasswordButton: React.FC = () => {
  const { data: user } = useAuth();
  const { sendRecoveryEmail, isPending } = useForgotPassword();
  const [snackbarMessage, setSnackbarMessage] = useState<Nullable<string>>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [disableButton, setDisableButton] = useState(false);

  const handleTimerComplete = useCallback(() => {
    setDisableButton(false);
  }, []);

  const [timer, setTimer] = useTimer(60, disableButton, handleTimerComplete);

  const handleClose = () => {
    setSnackbarMessage(null);
  };

  const handleChangePasswordClick = () => {
    if (!user || !user.email) {
      setSnackbarSeverity('error');
      setSnackbarMessage('User not authenticated.');
      return;
    }

    sendRecoveryEmail(
      {
        email: user.email,
        redirectUrl: `${window.location.origin}${Routes.RESET_PASSWORD}`,
      },
      {
        onSuccess: () => {
          setSnackbarSeverity('success');
          setSnackbarMessage('Password reset email sent successfully.');
          setDisableButton(true);
          setTimer(60);
        },
        onError: () => {
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to send password reset email.');
        },
      },
    );
  };

  return (
    <>
      <LoadingButton
        onClick={handleChangePasswordClick}
        disabled={isPending || disableButton}
        loading={isPending}
      >
        {disableButton ? `Change (${prettifyDuration(timer * 1000)})` : 'Change'}
      </LoadingButton>
      <Snackbar open={snackbarMessage !== null} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="standard" severity={snackbarSeverity} onClose={handleClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangePasswordButton;
