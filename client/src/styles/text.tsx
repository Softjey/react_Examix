import { SxTheme } from '../types/utils/SxTheme';

export const textEllipsis: SxTheme = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const textMultilineEllipsis = (linesAmount: number): SxTheme => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: linesAmount,
  lineClamp: linesAmount,
});
