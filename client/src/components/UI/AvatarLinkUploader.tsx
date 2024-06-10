import {
  Box,
  Modal,
  Typography,
  TextField,
  CircularProgress,
  Button,
  BoxProps,
} from '@mui/material';
import { useState, ChangeEvent } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { FieldValues, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import useAuth from '../../hooks/queries/useAuth';
import useUpdateMe from '../../hooks/queries/useUpdateMe';
import { Nullable } from '../../types/utils/Nullable';
import isImageAcessable from '../../utils/isImageAcessable';
import isValidUrl from '../../utils/isValidUrl';
import UserAvatar from './UserAvatar';

interface Props extends BoxProps {
  userAvatarLink: string | null;
  disabled: boolean;
  registerReturn: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<FieldValues>;
  onAvatarChange: (newAvatarLink: string) => void;
}

const AvatarLinkUploader: React.FC<Props> = ({
  setValue,
  registerReturn,
  userAvatarLink,
  disabled,
  onAvatarChange,
  ...props
}) => {
  const [, setImageLink] = useState<Nullable<string>>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<Nullable<string>>(null);
  const { data: user } = useAuth();
  const { updateMe, isPending, isError } = useUpdateMe();

  const handleImageChange = async () => {
    if (!error) {
      updateMe(
        { photo: userAvatarLink },
        {
          onSuccess: () => {
            onAvatarChange(userAvatarLink || '');
            setOpen(false);
          },
          onError: () => {
            setError('Failed to update avatar');
          },
        },
      );
    }
  };

  const handleAvatarClick = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const { onChange, ...reg } = registerReturn;

  const onModalClose = () => {
    setOpen(false);
  };

  const onUserAvatarLinkChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const link = e.target.value;

    const getErrorMessage = async () => {
      const isAccessible = await isImageAcessable(link);
      const isUrl = isValidUrl(link);

      if (!isUrl) return 'The URL is not valid';
      if (!isAccessible) return 'Image is not accessible';
      return null;
    };

    const errorMessage = await getErrorMessage();
    setError(errorMessage);
    onChange(e);

    if (!errorMessage) {
      onAvatarChange(link);
    }
  };

  const handleDeleteImage = () => {
    updateMe(
      { photo: null },
      {
        onSuccess: () => {
          setOpen(false);
          setImageLink(null);
          setValue('userAvatarLink', null);
          onAvatarChange('');
        },
        onError: () => {
          setError('Failed to delete avatar');
        },
      },
    );
  };

  return (
    <>
      <UserAvatar
        onClick={handleAvatarClick}
        user={user}
        sx={{ width: 60, height: 60, cursor: disabled ? 'unset' : 'pointer', ...props.sx }}
      />
      <Modal open={open} onClose={onModalClose}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: 4,
            outline: 'none',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6">Upload Image</Typography>
          <TextField
            type="url"
            {...reg}
            onChange={onUserAvatarLinkChange}
            error={!!error}
            helperText={error}
            variant="standard"
            placeholder="Paste image link here"
            sx={{ width: '100%' }}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '80%',
              aspectRatio: '3 / 3',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: isError || !userAvatarLink ? 'none' : `url(${userAvatarLink})`,
              border: isError || !userAvatarLink ? '2px dashed gray' : 'none',
              borderRadius: '8px',
            }}
          >
            {isPending && <CircularProgress size={50} />}
          </Box>

          <Box display="flex" gap={2} justifyContent="space-between">
            <Button
              fullWidth
              size="small"
              disabled={!!error || isPending}
              variant="contained"
              onClick={handleImageChange}
            >
              Set image
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={handleDeleteImage}
            >
              Delete Image
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AvatarLinkUploader;
