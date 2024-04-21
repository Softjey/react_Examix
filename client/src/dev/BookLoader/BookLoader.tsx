/* eslint-disable react/self-closing-comp */
import './BookLoader.css'; // Ensure the CSS is properly imported.

const BookLoader: React.FC = () => {
  // Creating an array of numbers for the pages with TypeScript specific typing
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
          <li key={page}></li> // Using `page` directly as it uniquely identifies each list item
        ))}
      </ul>
    </div>
  );
};

export default BookLoader;
