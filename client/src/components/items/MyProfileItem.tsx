import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAuth from '../../hooks/queries/useAuth';
import UserAvatar from '../UI/UserAvatar';

interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  role: string;
  createdAt: string;
}

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
    <Box gap={2} p={2} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
      />
      <Box onClick={handleAvatarClick} sx={{ cursor: 'pointer', width: 80, height: 80 }}>
        <UserAvatar user={userWithAvatar} sx={{ width: '100%', height: '100%' }} />
      </Box>

      {editMode ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <TextField
            value={name}
            onChange={handleNameChange}
            variant="outlined"
            size="small"
            sx={{ width: 200 }}
          />
        </Box>
      ) : (
        <Typography
          variant="h6"
          color="text.primary"
          sx={{
            backgroundColor: '#f0f0f0',
            borderRadius: 1,
            padding: '8px 16px',
            width: 200,
            height: 40,
            display: 'flex',
            alignItems: 'center',
          }}
        >
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
  );
};

export default MyProfileItem;
