import { Box, BoxProps } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Props extends BoxProps {}

const DragBar: React.FC<Props> = (props) => {
  return (
    <Box
      {...props}
      className="drag-bar"
      sx={{
        color: 'text.secondary',
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
        opacity: 0,
        cursor: 'grab',
        visibility: 'hidden',
      }}
    >
      <DragIndicatorIcon sx={{ transform: 'rotate(90deg)' }} />
    </Box>
  );
};

export default DragBar;
