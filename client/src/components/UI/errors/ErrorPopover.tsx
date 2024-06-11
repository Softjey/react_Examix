import { Popover, Typography, useScrollTrigger } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  isError: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}

const ErrorPopover: React.FC<Props> = ({ isError, errorMessage, children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && isError;

  const trigger = useScrollTrigger();

  useEffect(() => {
    setAnchorEl(null);
  }, [trigger]);

  return (
    <>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </div>

      <Popover
        disableScrollLock
        disableAutoFocus
        disableEnforceFocus
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
      >
        <Typography color="white" variant="body2" sx={{ backgroundColor: '#F55555', p: 1 }}>
          {errorMessage}
        </Typography>
      </Popover>
    </>
  );
};

export default ErrorPopover;
