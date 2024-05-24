import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import React from 'react';
import Subject from '../../types/api/Subject';
import underscoreToUpperToSentence from '../../utils/underscoreToUpperToSentence';
import { textEllipsis } from '../../styles/text';
import getSubjectImgPath from '../../utils/getSubjectImgPath';
import { Nullable } from '../../types/utils/Nullable';

interface Props extends BoxProps {
  subject?: Nullable<Subject>;
  endText?: string;
  typographyProps?: TypographyProps;
}

const SubjectItem: React.FC<Props> = ({ typographyProps, subject, endText, sx, ...rest }) => {
  return (
    <Box
      component="span"
      sx={{ display: 'flex', alignItems: 'center', gap: '4px', ...sx }}
      {...rest}
    >
      {subject && <img src={getSubjectImgPath(subject)} alt={subject} width={14} height={14} />}

      <Typography
        component="span"
        variant="caption"
        {...typographyProps}
        sx={{ maxWidth: '100%', ...textEllipsis, ...typographyProps?.sx }}
      >
        {subject ? underscoreToUpperToSentence(subject) : 'No subject'}
        {endText ? `. ${endText}` : ''}
      </Typography>
    </Box>
  );
};

export default SubjectItem;
