import { SxTheme } from '../../../types/utils/SxTheme';

const sx = {
  studentsQuestionsCell: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 3,
    borderRight: (theme) => `1px solid ${theme.palette.text.primary}`,
    borderBottom: (theme) => `1px solid ${theme.palette.text.primary}`,
    fontSize: (theme) => theme.typography.caption.fontSize,
  },
  studentCell: {
    position: 'sticky',
    zIndex: 1,
    left: 0,
    minWidth: 150,
    wordBreak: 'break-all',
    backgroundColor: (theme) => theme.palette.background.paper,
    borderRight: (theme) => `1px solid ${theme.palette.text.primary}`,
  },
  scoreCell: {
    p: 0,
    height: 2, // idk how, but it needs for the button height to be 100%
    backgroundColor: (theme) => theme.palette.background.paper,
    borderRight: (theme) => `1px solid ${theme.palette.divider}`,
  },
  questionCell: {
    p: 0,
    height: 2, // idk how, but it needs for the button height to be 100%
    backgroundColor: (theme) => theme.palette.background.paper,
    borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
    borderBottom: (theme) => `1px solid ${theme.palette.text.primary}`,
  },
  resultsCell: {
    position: 'sticky',
    right: 0,
    zIndex: 2,
    borderLeft: (theme) => `1px solid ${theme.palette.text.primary}`,
    borderBottom: (theme) => `1px solid ${theme.palette.text.primary}`,
  },
  resultCell: {
    minWidth: 120,
    position: 'sticky',
    right: 0,
    zIndex: 1,
    backgroundColor: (theme) => theme.palette.background.paper,
    borderLeft: (theme) => `1px solid ${theme.palette.text.primary}`,
  },
  dialogButton: {
    height: '100%',
    p: 0,
    borderRadius: 0,
    color: 'inherit',
    '&:hover': {
      bgcolor: (theme) => theme.palette.grey[400],
    },
  },
  container: {
    width: '100%',
    userSelect: 'none',
    maxHeight: 600,
  },
} satisfies Record<string, SxTheme>;

export default sx;
