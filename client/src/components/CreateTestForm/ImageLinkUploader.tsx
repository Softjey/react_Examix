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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { FieldValues, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { Nullable } from '../../types/utils/Nullable';
import isImageAcessable from '../../utils/isImageAcessable';
import isValidUrl from '../../utils/isValidUrl';

interface Props extends BoxProps {
  testImageLink: string | null;
  disabled: boolean;
  registerReturn: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<FieldValues>;
}

const ImageLinkUploader: React.FC<Props> = ({
  setValue,
  registerReturn,
  testImageLink,
  disabled,
  ...props
}) => {
  const [imageLink, setImageLink] = useState<Nullable<string>>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Nullable<string>>(null);

  const handleImageChange = () => {
    setOpen(false);
    if (!error) {
      setImageLink(testImageLink);
    }
  };

  const { onChange, ...reg } = registerReturn;

  const onModalClose = async () => {
    setOpen(false);
    if (!error) {
      setImageLink(testImageLink);
    }
  };

  const onTestImageLinkChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const getErrorMessage = async () => {
      const isAcessable = await isImageAcessable(e.target.value);
      const isUrl = isValidUrl(e.target.value);

      if (!isUrl) return 'The url is not valid';
      if (!isAcessable) return 'Image is not acessable';
      return null;
    };

    const errorMessage = await getErrorMessage();
    setError(errorMessage);

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
              width: '100%',
              aspectRatio: '4 / 3',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: loading || error ? 'none' : `url(${testImageLink})`,
              border: loading || error || !testImageLink ? '2px dashed gray' : 'none',
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
