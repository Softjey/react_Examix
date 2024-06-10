import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import { BoxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm, UseFormSetValue, FieldValues } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';
import useAuth from '../../hooks/queries/useAuth';
import useUpdateMe from '../../hooks/queries/useUpdateMe';
import AvatarLinkUploader from '../CreateTestForm/schemas/AvatarLinkUploader';

interface Props extends BoxProps {}

const MyProfileItem: React.FC<Props> = (props) => {
  const { data: user, refetch } = useAuth();
  const { updateMe, isPending, isError, error } = useUpdateMe();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user ? user.name : '');
  const [avatarLink, setAvatarLink] = useState(user ? user.photo : '');
  const textFieldRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, setValue } = useForm<FieldValues>();
  const [disabled, setDisabled] = useState(false);

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setAvatarLink(user.photo);
      setEditMode(false);
    }
  };
  const handleEditClick = () => {
    setEditMode(true);
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSave = () => {
    updateMe({ name });
    setDisabled(true);
    updateMe({ name, photo: avatarLink });
    refetch();
    setEditMode(false);
    setDisabled(false);
  };

  const handleAvatarChange = (newAvatarLink: string) => {
    setAvatarLink(newAvatarLink);
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
      <AvatarLinkUploader
        disabled={disabled}
        userAvatarLink={avatarLink}
        onClick={handleAvatarClick}
        registerReturn={register('userAvatarLink')}
        setValue={setValue as unknown as UseFormSetValue<FieldValues>}
        onAvatarChange={handleAvatarChange}
        {...props}
      />

      <Stack direction="row" alignItems="center" gap={1}>
        <TextField
          disabled={!editMode || disabled}
          value={name}
          onChange={handleNameChange}
          onClick={handleEditClick}
          variant="outlined"
          autoComplete="off"
          size="small"
          inputRef={textFieldRef}
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
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
              disabled={isPending || disabled}
            >
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
