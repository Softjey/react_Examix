import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

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

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[600],
    '&:hover': {
      backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: green[600],
  },
  '& .Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[500],
  },
}));

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
        <ListItemIcon>
          <PinIcon />
        </ListItemIcon>
        <ListItemText primary="Change PIN Code" />
        <Button onClick={() => setIsPinModalOpen(true)}>Change</Button>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PinIcon />
        </ListItemIcon>
        <ListItemText primary="Enable/Disable PIN Code" />
        <CustomSwitch {...label} checked={isPinEnabled} onChange={handlePinToggle} />
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
            p: 1,
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
