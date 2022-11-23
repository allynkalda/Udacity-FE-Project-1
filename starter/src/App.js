import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { getAll, search } from "./BooksAPI"
import Home from "./Home";
import Search from "./Search";
import "./App.css";
import { SHELVES } from "./constants/shelves";

const storedBooks = JSON.parse(window.localStorage.getItem('allBooks'))
const storedSearchedBooks = JSON.parse(window.localStorage.getItem('searchedBooks'))
const searchQuery = JSON.parse(window.localStorage.getItem('searchQuery'))

const App = () => {
  const [ allBooks, setAllBooks ] = useState(storedBooks || [])
  const [ currentlyReading, setCurrentlyReading ] = useState([])
  const [ wantToRead, setWantToRead ] = useState([])
  const [ read, setRead ] = useState([])
  const [ searchedBooks, setSearchedBooks ] = useState(storedSearchedBooks || [])
  const [ query, setQuery ] = useState(searchQuery || "")

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

  const storeSearchedBooks = (data = []) => {
    setSearchedBooks(data)
    window.localStorage.setItem('searchedBooks', JSON.stringify(data))
  }

  const handleInputChange = (event) => {
    const query = event.currentTarget.value;

    setQuery(query)
    window.localStorage.setItem('searchQuery', JSON.stringify(query))

    if (!query) {
      storeSearchedBooks([])
    } else {
      search(query)
      .then((res) => storeSearchedBooks(res.error ? [] : res))
      .catch((err) => console.error(err))
    }
  }

  useEffect(() => {

    if (!allBooks.length) {
      getAll()
      .then((res) => setAllBooks(res))
      .catch((err) => console.error(err))
    }

    const currentlyReadingBooks = allBooks.filter((book) => book.shelf === SHELVES.CURRENTLY_READING)
    setCurrentlyReading(currentlyReadingBooks)

    const wantToReadBooks = allBooks.filter((book) => book.shelf === SHELVES.WANT_TO_READ)
    setWantToRead(wantToReadBooks)
    
    const readBooks = allBooks.filter((book) => book.shelf === SHELVES.READ)
    setRead(readBooks)

    window.localStorage.setItem('allBooks', JSON.stringify(allBooks))
  }, [allBooks])
  
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home 
            changeBookStatus={changeBookStatus}
            currentlyReading={currentlyReading}
            read={read} 
            wantToRead={wantToRead}
        />}
        />
        <Route path="/search" element={<Search
            allBooks={allBooks}
            changeBookStatus={changeBookStatus}
            searchedBooks={searchedBooks}
            handleInputChange={handleInputChange}
            query={query}
            setAllBooks={setAllBooks}
        />} 
        />
      </Routes>
    </div>
  );
}

export default App;
