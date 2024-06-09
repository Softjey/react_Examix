import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';
import useAuth from '../../hooks/queries/useAuth';
import UserAvatar from './UserAvatar';
import useUpdateMe from '../../hooks/queries/useUpdateMe';

const MyProfileItem: React.FC = () => {
  const { data: user } = useAuth();
  const { updateMe, isPending, isError, error } = useUpdateMe();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user ? user.name : '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setEditMode(true);
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEditMode(false);
    }
  };

  const handleSave = () => {
    updateMe({ name });
    setEditMode(false);
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  return (
    <Box
      gap={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-top',
        marginBottom: 2,
        paddingBlock: 1,
        position: 'relative',
        pointerEvents: isPending ? 'none' : 'auto',
        opacity: isPending ? 0.5 : 1,
      }}
    >
      <UserAvatar
        onClick={handleAvatarClick}
        user={user}
        sx={{ width: 60, height: 60, cursor: 'pointer' }}
        title="Change avatar feature will be available soon"
      />

      <Stack direction="row" alignItems="center" gap={1}>
        <TextField
          value={name}
          onChange={handleNameChange}
          variant="outlined"
          autoComplete="off"
          size="small"
          inputRef={textFieldRef}
          onClick={handleEditClick}
          sx={{
            width: 180,
            height: 40,
            color: editMode ? 'text.primary' : 'text.secondary',
            '.MuiInputBase-root': { height: '100%' },
            '.MuiOutlinedInput-input': { paddingInline: 1 },
          }}
        />

        {!editMode && (
          <CreateIcon
            color="disabled"
            sx={{
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={handleEditClick}
          />
        )}
      </Stack>

      {editMode && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="contained" size="small" onClick={handleSave} disabled={isPending}>
              {isPending ? <CircularProgress size={24} /> : 'OK'}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleCancel} disabled={isPending}>
              Cancel
            </Button>
          </Box>
        </>
      )}
      {isError && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </Box>
  );
};

export default MyProfileItem;
