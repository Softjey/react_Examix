import { Chip, ChipProps } from '@mui/material';
import React from 'react';

interface Props extends ChipProps {}

const RectChip: React.FC<Props> = ({ sx, ...rest }) => {
  return (
    <Chip
      variant="outlined"
      size="small"
      sx={{ flexGrow: 1, borderRadius: 1, userSelect: 'none', ...sx }}
      {...rest}
    />
  );
};

export default RectChip;
