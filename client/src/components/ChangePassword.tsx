import React, { useState } from 'react';
import { Modal, TextField, Typography, Box } from '@mui/material';
import Button from './UI/buttons/Button';

const ChangePasswordButton: React.FC = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');

  const handlePasswordChange = async () => {
    setIsPasswordModalOpen(false);
    // Implement the logic for changing the password here
  };

  return (
    <>
      <Button onClick={() => setIsPasswordModalOpen(true)}>Change</Button>

      <Modal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
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
          <TextField
            fullWidth
            label="Enter email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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

export default ChangePasswordButton;
