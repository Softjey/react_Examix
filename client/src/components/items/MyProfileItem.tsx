import React, { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAuth from '../../hooks/queries/useAuth';
import UserAvatar from '../UI/UserAvatar';

// Assuming User type from useAuth hook
interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  role: string; // Replace with actual type if different
  createdAt: string;
}

// Extending the User type to include avatar property locally
interface UserWithAvatar extends User {
  avatar?: string;
}

const MyProfileItem: React.FC = () => {
  const { data: user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user ? user.name : '');
  const [avatar, setAvatar] = useState<string | undefined>(
    user ? user.photo ?? undefined : undefined,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCancel = () => {
    setName(user.name);
    setAvatar(user.photo ?? undefined);
    setEditMode(false);
  };

  const handleSave = () => {
    // Add code to save the updated name and avatar
    setEditMode(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const userWithAvatar: UserWithAvatar = { ...user, avatar };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Box gap={2} p={2} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
        <Box onClick={handleAvatarClick} sx={{ cursor: 'pointer' }}>
          <UserAvatar user={userWithAvatar} />
        </Box>

        {editMode ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <TextField
              value={name}
              onChange={handleNameChange}
              variant="outlined"
              size="small"
              sx={{ width: 150 }}
            />
          </Box>
        ) : (
          <Typography variant="h6" color="text.primary">
            {name}
          </Typography>
        )}

        {editMode ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="contained" size="small" onClick={handleSave}>
              OK
            </Button>
            <Button variant="outlined" size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        ) : (
          <CreateIcon
            color="disabled"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
            onClick={handleEditClick}
          />
        )}
      </Box>
    </Box>
  );
};

export default MyProfileItem;
