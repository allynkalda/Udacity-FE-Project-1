import { Link } from "react-router-dom";
import BookCard from "./components/BookCard/BookCard"

const Search = ({ allBooks, changeBookStatus, searchedBooks, setSearchedBooks }) => {

    const handleInputChange = (event) => {
        const query = event.currentTarget.value;
        const filteredBooks = allBooks.filter((book) => book.title.includes(query))
        setSearchedBooks(filteredBooks)
    }

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
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {searchedBooks?.map((book) => (
                    <BookCard 
                    key={book.id}
                    bookInfo={book}
                    changeBookStatus={changeBookStatus}
                    />
                )
                )}
            </ol>
          </div>
        </div>
    )
}

export default Search;