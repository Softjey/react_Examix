import React, { useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Modal,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import PasswordIcon from '@mui/icons-material/Password';

const ChangeUserInfo: React.FC = () => {
  const [isChangePasswordOpen, setIsChangePasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
    // Implement password change logic here
    setIsChangePasswordModalOpen(false);
  };

  return (
    <>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 50 }}>
          <Avatar
            sx={{ marginLeft: -0.5, fontSize: 25 }}
            alt="Profile picture"
            src="/static/images/avatar/1.jpg"
          />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body1">Profile picture</Typography>} />
        <Button
          onClick={() => {
            // Add logic for changing profile picture
          }}
        >
          Click
        </Button>
      </ListItem>

      <ListItem>
        <ListItemIcon sx={{ minWidth: 50 }}>
          <ContactEmergencyIcon sx={{ marginLeft: 0.3, fontSize: 30 }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body1">Name</Typography>} />
        <Button
          onClick={() => {
            // Add logic for changing name
          }}
        >
          Click
        </Button>
      </ListItem>

      <Box>
        <Typography marginLeft={2} color="gray" variant="body1">
          Update your profile information.
        </Typography>
      </Box>

      <ListItem>
        <ListItemIcon sx={{ minWidth: 50 }}>
          <PasswordIcon sx={{ marginLeft: 0.3, fontSize: 30 }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body1">Change Password</Typography>} />
        <Button onClick={() => setIsChangePasswordModalOpen(true)}>Click</Button>
      </ListItem>

      <Box>
        <Typography marginLeft={2} color="gray" variant="body1">
          Change your Password.
        </Typography>
      </Box>

      <Modal
        open={isChangePasswordOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        aria-labelledby="password-modal-title"
        aria-describedby="password-modal-description"
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
          <Typography id="password-modal-title" variant="h6" component="h2">
            Change Password
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
              label="Enter New Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={handlePasswordChange}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChangeUserInfo;
