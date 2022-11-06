import "./App.css";
import { useEffect, useState } from "react";
import BookCard from "./components/BookCard/BookCard";
import BookShelf from "./components/BookShelf/BookShelf";
import { getAll } from "./BooksAPI"

const SHELVES = {
  CURRENTLY_READING: "currentlyReading",
  WANT_TO_READ: "wantToRead",
  READ: "read"
}

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [ allBooks, setAllBooks ] = useState([])
  const [ currentlyReading, setCurrentlyReading ] = useState([])
  const [ wantToRead, setWantToRead ] = useState([])
  const [ read, setRead ] = useState([])

  const changeBookStatus = (selectedBook, status) => {
    const newBookInfo = allBooks.map((books) => {
      if (books.id === selectedBook.id) {
        return {
          ...selectedBook,
          shelf: status
        }
      }
      return books
    })
    setAllBooks(newBookInfo)
  }

  useEffect(() => {
    getAll()
      .then((res) => setAllBooks(res))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    const currentlyReadingBooks = allBooks.filter((book) => book.shelf === SHELVES.CURRENTLY_READING)
    setCurrentlyReading(currentlyReadingBooks)

    const wantToReadBooks = allBooks.filter((book) => book.shelf === SHELVES.WANT_TO_READ)
    setWantToRead(wantToReadBooks)
    
    const readBooks = allBooks.filter((book) => book.shelf === SHELVES.READ)
    setRead(readBooks)
  }, [allBooks])

  console.log('allBooks', allBooks)
  
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
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
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
