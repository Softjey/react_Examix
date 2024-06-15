import React, { useState, ChangeEvent } from 'react';
import { Box, BoxProps, IconButton, Modal, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImageUploaderProps extends BoxProps {}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setOpen(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setImage(URL.createObjectURL(event.dataTransfer.files[0]));
      setOpen(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        {...props}
        sx={{
          width: '100%',
          aspectRatio: '4 / 3',
          border: image ? 'none' : '2px dashed gray',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: image ? `url(${image})` : 'none',
          cursor: 'pointer',
          ...props.sx,
        }}
        onClick={() => setOpen(true)}
      >
        {!image && <PhotoCameraIcon sx={{ fontSize: 48, color: 'gray' }} />}
        {image && (
          <IconButton
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setImage(null);
            }}
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      <Modal disableScrollLock open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload Image
          </Typography>
          <Box
            sx={{
              border: '2px dashed gray',
              borderRadius: '8px',
              padding: 2,
              textAlign: 'center',
              cursor: 'pointer',
              color: 'gray',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            Drag & Drop image here or click to select file
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ImageUploader;
