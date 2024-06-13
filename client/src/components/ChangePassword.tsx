import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from './UI/buttons/Button';
import useForgotPassword from '../hooks/queries/useForgotPassword';
import useAuth from '../hooks/queries/useAuth';
import prettifyDuration from '../utils/time/prettifyDuration';

const ChangePasswordButton: React.FC = () => {
  const { data: user } = useAuth();
  const { sendRecoveryEmail, isPending } = useForgotPassword();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const [disableButton, setDisableButton] = useState(false);

  const handleClose = () => {
    setSnackbarOpen(false);
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

  function handleChangePasswordClick() {
    setDisableButton(true);
    setTimer(60);

    sendRecoveryEmail(
      {
        email: user?.email || '',
        redirectUrl: `${window.location.href.split('#')[0]}#/reset-password`,
      },
      {
        onSuccess: () => {
          setSnackbarSeverity('success');
          setSnackbarMessage(
            'Password reset email sent successfully. If you want to change again, please wait for 1 minute.',
          );
          setSnackbarOpen(true);
        },
        onError: () => {
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to send password reset email.');
          setSnackbarOpen(true);
          setDisableButton(false);
        },
      },
    );
  }

  return (
    <>
      <Button onClick={() => handleChangePasswordClick()} disabled={isPending || disableButton}>
        {disableButton ? `Change (${prettifyDuration(timer * 1000)})` : 'Change'}
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert elevation={6} variant="standard" onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangePasswordButton;
