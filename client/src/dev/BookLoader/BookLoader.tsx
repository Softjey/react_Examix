/* eslint-disable react/self-closing-comp */
import './BookLoader.css';

const BookLoader: React.FC = () => {
  const pages = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="book">
      <div className="inner">
        <div className="left"></div>
        <div className="middle"></div>
        <div className="right"></div>
      </div>
      <ul>
        {pages.map((page) => (
          <li key={page}></li>
        ))}
      </ul>
    </div>
  );
};

export default BookLoader;
