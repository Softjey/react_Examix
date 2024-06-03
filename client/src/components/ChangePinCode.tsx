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
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');

  const handlePinToggle = () => {
    setIsPinEnabled(!isPinEnabled);
  };

  const handlePinChange = () => {
    // Implement pin change logic here
    setIsPinModalOpen(false);
  };

  return (
    <>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 50 }}>
          <PinIcon sx={{ fontSize: 35 }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h6">Pin Code</Typography>} />
        <Button onClick={() => setIsPinModalOpen(true)}>Change</Button>
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 50 }}>
          <FiberPinIcon sx={{ fontSize: 35 }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h6">Pin Code Protection</Typography>} />
        <Switch {...label} checked={isPinEnabled} onChange={handlePinToggle} />
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
    </>
  );
};

export default ChangePinCode;
