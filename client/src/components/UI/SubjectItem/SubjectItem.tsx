import { Box, BoxProps, Chip } from '@mui/material';
import { ChipProps as MuiChipProps, TypographyProps } from '@mui/material';
import React from 'react';
import Subject from '../../../types/api/enums/Subject';
import { Nullable } from '../../../types/utils/Nullable';
import SubjectItemContent from './SubjectItemContent';

interface BaseProps {
  subject?: Nullable<Subject>;
  endText?: string;
  typographyProps?: Omit<TypographyProps, 'variant'>;
  textVariant?: TypographyProps['variant'];
}

export interface DefaultProps extends BaseProps, BoxProps {
  variant?: 'default';
}

export interface ChipProps extends BaseProps, Omit<MuiChipProps, 'variant'> {
  variant?: 'chip';
  chipVariant?: MuiChipProps['variant'];
}

export type Props = DefaultProps | ChipProps;

const SubjectItem: React.FC<Props> = ({
  textVariant,
  variant = 'default',
  typographyProps,
  ...props
}) => {
  const { subject, endText, sx, ...rest } = props;
  const baseSx = { display: 'flex', alignItems: 'center', gap: '4px' };
  const content = <SubjectItemContent {...{ subject, endText, textVariant, typographyProps }} />;

  if (variant === 'chip') {
    const { chipVariant, ...restChipProps } = rest as Omit<ChipProps, 'variant'>;

    return (
      <Chip
        label={content}
        size="small"
        sx={{ '.MuiChip-label': { ...baseSx }, bgcolor: '#fff8', ...sx }}
        variant={chipVariant}
        {...restChipProps}
      />
    );
  }

  return (
    <Box component="span" sx={{ ...baseSx, ...sx }} {...rest}>
      {content}
    </Box>
  );
};

export default SubjectItem;
