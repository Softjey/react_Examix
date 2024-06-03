import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Avatar, Button } from '@mui/material';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Typography from '@mui/material/Typography';

const ChangeUserInfo: React.FC = () => {
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
        <ListItemText primary={<Typography variant="h6">Profile picture</Typography>} />
        <Button
          onClick={() => {
            /* Add logic for changing avatar */
          }}
        >
          Click
        </Button>
      </ListItem>

      <ListItem>
        <ListItemIcon sx={{ minWidth: 50 }}>
          <ContactEmergencyIcon sx={{ marginLeft: 0.3, fontSize: 30 }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h6">Name</Typography>} />
        <Button
          onClick={() => {
            /* Add logic for changing name */
          }}
        >
          Click
        </Button>
      </ListItem>
    </>
  );
};

export default ChangeUserInfo;
