import React, { useState } from 'react';
import { Modal, TextField, Typography, Box, Stack } from '@mui/material';
import Button from './UI/buttons/Button';

const DeleteAccount: React.FC<{ disabled?: boolean }> = ({ disabled = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Implement account deletion logic here
    setIsModalOpen(false);
  };

  return (
    <Stack
      title="This feature is unavailable"
      sx={{
        cursor: 'not-allowed',
      }}
    >
      <Button disabled={disabled} variant="contained" color="error" onClick={handleDeleteClick}>
        Delete Account
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="delete-account-modal-title"
        aria-describedby="delete-account-modal-description"
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
          <Typography id="delete-account-modal-title" variant="h6" component="h2">
            Confirm Account Deletion
          </Typography>
          <TextField
            fullWidth
            label="Enter Password to Confirm"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Button fullWidth variant="contained" color="error" onClick={handleDeleteConfirm}>
              DELETE
            </Button>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );
};

export default DeleteAccount;
