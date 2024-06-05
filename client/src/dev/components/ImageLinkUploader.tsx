import React, { useState, ChangeEvent, useContext } from 'react';
import { Box, BoxProps, CircularProgress, Modal, TextField, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from 'react-hook-form';
import Button from '../../components/UI/buttons/Button';
import { CreateTestForm, isValidImageUrl } from '../../schemas/createTestFormValidationSchemas';
import { Nullable } from '../../types/utils/Nullable';
import { CreateTestContext } from '../../hooks/context/CreateTestContext';

interface ImageLinkUploaderProps extends BoxProps {}

const ImageLinkUploader: React.FC<ImageLinkUploaderProps> = (props) => {
  const { register, watch, setValue } = useFormContext<CreateTestForm>();

  const [imageLink, setImageLink] = useState<Nullable<string>>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Nullable<Error>>(null);

  const createTestContext = useContext(CreateTestContext);

  if (!createTestContext) {
    throw new Error('DisabledContext must be used within a DisabledContext.Provider');
  }

  const { loading: disabled } = createTestContext;

  const handleImageChange = () => {
    setOpen(false);
    setImageLink(watch('testImageLink'));
  };

  const { onChange, ...reg } = register('testImageLink');

  const onModalClose = async () => {
    setOpen(false);
    const link = watch('testImageLink');
    if (await isValidImageUrl(link!)) {
      setImageLink(link);
    }
  };

  const onTestImageLinkChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const isValid = await isValidImageUrl(e.target.value);
    if (!isValid) {
      setError(new Error('Image is not acessable'));
    } else {
      setError(null);
    }
    setLoading(false);
    onChange(e);
  };

  return (
    <>
      <Box
        {...props}
        sx={{
          width: '100%',
          aspectRatio: '4 / 3',
          border: imageLink ? 'none' : '2px dashed gray',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: imageLink ? `url(${imageLink})` : 'none',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'unset' : 'pointer',
          ...props.sx,
        }}
        onClick={() => {
          if (!disabled) {
            setOpen(true);
          }
        }}
      >
        {!imageLink && <PhotoCameraIcon sx={{ fontSize: 48, color: 'gray' }} />}
      </Box>
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
            onChange={onTestImageLinkChange}
            error={!!error}
            helperText={error?.message}
            variant="standard"
            placeholder="Paste image link here"
            sx={{ width: '100%' }}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              aspectRatio: '4 / 3',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: loading || error ? 'none' : `url(${watch('testImageLink')})`,
              border: loading || error || !watch('testImageLink') ? '2px dashed gray' : 'none',
              borderRadius: '8px',
            }}
          >
            {loading && <CircularProgress size={50} />}
          </Box>

          <Box display="flex" gap={2} justifyContent="space-between">
            <Button
              fullWidth
              size="small"
              disabled={!!error}
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
              onClick={() => {
                setOpen(false);
                setImageLink(null);
                setValue('testImageLink', null);
              }}
            >
              Delete Image
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ImageLinkUploader;
