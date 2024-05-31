import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteAccount: React.FC = () => {
  return (
    <ListItem>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Delete Account" />
      <Button
        onClick={() => {
          /* Add logic for deleting account */
        }}
      >
        Delete
      </Button>
    </ListItem>
  );
};

export default DeleteAccount;
