import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FiberPinIcon from '@mui/icons-material/FiberPin';
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import PinIcon from '@mui/icons-material/Pin';

const label = { inputProps: { 'aria-label': 'controlled' } };

const ChangePinCode: React.FC = () => {
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertInput, setAlertInput] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');

  const handlePinChange = () => {
    // Implement pin change logic here
    setIsPinModalOpen(false);
  };

  const handlePinToggle = () => {
    const newPinEnabledState = !isPinEnabled;
    setIsPinEnabled(newPinEnabledState);

    if (!newPinEnabledState) {
      setIsAlertModalOpen(true);
    }
  };

  const hadlePasswordConfirm = () => {
    // Implement a password confirmation logic here
    setIsAlertModalOpen(false);
  };

  return (
    <>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 50 }}>
          <PinIcon sx={{ fontSize: 35 }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h6">Change Pin Code</Typography>} />
        <Button onClick={() => setIsPinModalOpen(true)}>Click</Button>
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 50 }}>
          <FiberPinIcon sx={{ fontSize: 35 }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h6">Pin Code Protection</Typography>} />
        <Switch {...label} defaultChecked={isPinEnabled} onChange={handlePinToggle} />
      </ListItem>

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
          }}
        >
          <Typography id="pin-modal-title" variant="h6" component="h2">
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
          <Box sx={{ mt: 0 }}>
            <TextField
              fullWidth
              label="Enter New PIN Code"
              type="password"
              variant="outlined"
              margin="normal"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={handlePinChange}>
              Confirm
            </Button>
          </Box>
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
          }}
        >
          <Typography id="alert-modal-title" variant="h6" component="h2">
            Password Confirmation
          </Typography>
          <TextField
            fullWidth
            label="Enter a your password"
            variant="outlined"
            margin="normal"
            value={alertInput}
            onChange={(e) => setAlertInput(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={hadlePasswordConfirm}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChangePinCode;
