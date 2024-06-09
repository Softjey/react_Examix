import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { Modal, TextField, Typography, Box } from '@mui/material';
import Button from './UI/buttons/Button';

const label = { inputProps: { 'aria-label': 'controlled' } };

const ChangePinCode: React.FC = () => {
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertInput, setAlertInput] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');

  const handlePinChange = () => {
    setIsPinModalOpen(false);
    // Implement the logic for changing the PIN code here
  };

  const handlePinToggle = () => {
    const newPinEnabledState = !isPinEnabled;
    setIsPinEnabled(newPinEnabledState);

    if (!newPinEnabledState) {
      setIsAlertModalOpen(true);
    }
  };

  const handlePasswordConfirm = () => {
    setIsAlertModalOpen(false);
    // Implement the logic for password confirmation here
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        {isPinEnabled && (
          <Button
            sx={{ mr: 2, padding: '4px 8px', fontSize: '0.75rem' }}
            variant="outlined"
            color="primary"
            onClick={() => setIsPinModalOpen(true)}
          >
            Change PIN Code
          </Button>
        )}
        <Switch {...label} checked={isPinEnabled} onChange={handlePinToggle} />
      </Box>

      <Modal
        open={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        aria-labelledby="pin-modal-title"
        aria-describedby="pin-modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            padding: 3,
            m: 'auto',
            mt: '15%',
            borderRadius: 1,
            boxShadow: 24,
          }}
        >
          <Typography id="pin-modal-title" variant="h6" component="h2" gutterBottom>
            Change PIN Code
          </Typography>
          <TextField
            fullWidth
            label="Enter Current Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Enter New PIN Code"
            type="password"
            variant="outlined"
            margin="normal"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handlePinChange}
            sx={{ mt: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>

      <Modal
        open={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        aria-labelledby="alert-modal-title"
        aria-describedby="alert-modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            padding: 3,
            m: 'auto',
            mt: '15%',
            borderRadius: 1,
            boxShadow: 24,
          }}
        >
          <Typography id="alert-modal-title" variant="h6" component="h2" gutterBottom>
            Password Confirmation
          </Typography>
          <TextField
            fullWidth
            label="Enter your password"
            variant="outlined"
            margin="normal"
            value={alertInput}
            onChange={(e) => setAlertInput(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handlePasswordConfirm}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ChangePinCode;
