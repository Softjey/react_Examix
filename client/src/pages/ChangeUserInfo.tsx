import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Avatar, Button } from '@mui/material';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

const ChangeUserInfo: React.FC = () => {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
        </ListItemIcon>
        <ListItemText primary="Change Avatar" />
        <Button
          onClick={() => {
            /* Add logic for changing avatar */
          }}
        >
          Change
        </Button>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ContactEmergencyIcon />
        </ListItemIcon>
        <ListItemText primary="Change Name" />
        <Button
          onClick={() => {
            /* Add logic for changing name */
          }}
        >
          Change
        </Button>
      </ListItem>
    </>
  );
};

export default ChangeUserInfo;
