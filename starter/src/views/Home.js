import { Link } from "react-router-dom";

import BookShelf from "../components/BookShelf/BookShelf";

const Home = ({
  changeBookStatus,
  categorizedBooks
}) => {

  if (Object.keys(categorizedBooks).length !== 0) {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={categorizedBooks.currentlyReading} changeBookStatus={changeBookStatus} title="Currently Reading" />
                <BookShelf books={categorizedBooks.wantToRead} changeBookStatus={changeBookStatus} title="Want to Read" />
                <BookShelf books={categorizedBooks.read} changeBookStatus={changeBookStatus} title="Read" />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      </div>
    )
  } else {
    return null
  }
}

export default Home;
