import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import useForgotPassword from '../hooks/queries/useForgotPassword';
import useAuth from '../hooks/queries/useAuth';
import prettifyDuration from '../utils/time/prettifyDuration';
import LoadingButton from './UI/buttons/LoadingButton';

const ChangePasswordButton: React.FC = () => {
  const { data: user } = useAuth();
  const { sendRecoveryEmail, isPending } = useForgotPassword();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [timer, setTimer] = useState<number>(60);
  const [disableButton, setDisableButton] = useState(false);

  const handleClose = () => {
    setSnackbarMessage(null);
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (disableButton && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId!);
            setDisableButton(false);
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [disableButton, timer]);

  const handleChangePasswordClick = () => {
    sendRecoveryEmail(
      {
        email: user?.email || '',
        redirectUrl: `${window.location.href.split('#')[0]}#/reset-password`,
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
          setDisableButton(false);
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
      <Snackbar open={snackbarMessage !== null} onClose={handleClose} autoHideDuration={6000}>
        <Alert elevation={1} variant="standard" onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangePasswordButton;
