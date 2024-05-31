import './DottedText.css';

interface Props {
  text: string;
}

const DottedText: React.FC<Props> = ({ text }) => <span className="dotted-text">{text}</span>;

export default DottedText;
