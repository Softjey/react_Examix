import { Typography, TypographyProps } from '@mui/material';
import React from 'react';
import { textEllipsis } from '../../../styles/text';
import getSubjectImgPath from '../../../utils/getSubjectImgPath';
import underscoreToUpperToSentence from '../../../utils/underscoreToUpperToSentence';
import Subject from '../../../types/api/enums/Subject';
import { Nullable } from '../../../types/utils/Nullable';
import getIconSizeByTypographyVariant from '../../../utils/getIconSizeByTypographyVariant';
import { SxTheme } from '../../../types/utils/SxTheme';

interface Props {
  subject?: Nullable<Subject>;
  endText?: string;
  typographyProps?: Omit<TypographyProps, 'variant'>;
  textVariant?: TypographyProps['variant'];
}

const SubjectItemContent: React.FC<Props> = ({
  subject,
  endText,
  textVariant = 'caption',
  typographyProps,
}) => {
  const iconSize = getIconSizeByTypographyVariant(textVariant);

  return (
    <>
      {subject && (
        <img src={getSubjectImgPath(subject)} alt={subject} width={iconSize} height={iconSize} />
      )}

      <Typography
        component="span"
        variant={textVariant}
        {...typographyProps}
        sx={
          {
            maxWidth: '100%',
            lineHeight: 'normal',
            ...textEllipsis,
            ...typographyProps?.sx,
          } as SxTheme
        }
      >
        {subject ? underscoreToUpperToSentence(subject) : 'No subject'}
        {endText ? `. ${endText}` : ''}
      </Typography>
    </>
  );
};

export default SubjectItemContent;
