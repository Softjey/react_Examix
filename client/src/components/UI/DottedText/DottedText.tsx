import { Typography, TypographyProps } from '@mui/material';
import classes from './DottedText.module.css';

interface Props extends TypographyProps {}

const DottedText: React.FC<Props> = (props) => (
  <Typography className={classes['dotted-text']} {...props} />
);

export default DottedText;
