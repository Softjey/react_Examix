/* eslint-disable react/self-closing-comp */
import classes from './BookLoader.module.css';

const BookLoader: React.FC = () => {
  const pages = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className={classes.book}>
      <div className={classes.inner}>
        <div className={classes.left}></div>
        <div className={classes.middle}></div>
        <div className={classes.right}></div>
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
