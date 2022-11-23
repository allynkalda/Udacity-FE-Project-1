import { Link } from "react-router-dom";

import BookCard from "./components/BookCard/BookCard"

const Search = ({ allBooks, changeBookStatus, handleInputChange, searchedBooks, query, setAllBooks }) => {

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handleInputChange}
                value={query}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {searchedBooks?.map((book) => (
                    <BookCard
                    allBooks={allBooks}
                    key={book.id}
                    bookInfo={book}
                    changeBookStatus={changeBookStatus}
                    setAllBooks={setAllBooks}
                    />
                )
                )}
            </ol>
          </div>
        </div>
    )
}

export default Search;