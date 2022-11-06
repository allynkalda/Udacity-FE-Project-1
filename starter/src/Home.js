import { Link } from "react-router-dom";

import BookShelf from "./components/BookShelf/BookShelf";
import "./App.css";

const Home = ({
  changeBookStatus,
  currentlyReading,
  read,
  wantToRead
}) => {
  
  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf books={currentlyReading} changeBookStatus={changeBookStatus} title="Currently Reading" />
              <BookShelf books={wantToRead} changeBookStatus={changeBookStatus} title="Want to Read" />
              <BookShelf books={read} changeBookStatus={changeBookStatus} title="Read" />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
    </div>
  );
}

export default Home;
