import React, { useState } from 'react'
import { update } from "../../BooksAPI"
import { SHELVES } from '../../constants/shelves'

const BookCard = ({
    allBooks,
    bookInfo,
    changeBookStatus,
    setAllBooks
}) => {
    const [ status, setStatus ] = useState(bookInfo.shelf || "none")

    const handleClick = (e) => {
      e.preventDefault()

      changeBookStatus(bookInfo, e.target.value)
      const updatedBookInfo = bookInfo
      updatedBookInfo.shelf = e.target.value

      update(bookInfo, e.target.value)
        .then(() => {
          setStatus(e.target.value)
          setAllBooks([
            ...allBooks,
            updatedBookInfo
          ])
        })
        .catch((err) => console.error(err))
    }

    return (
        <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                  `url(${bookInfo.imageLinks.thumbnail})`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select value={status} onChange={(e) => handleClick(e)}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value={SHELVES.CURRENTLY_READING}>
                  Currently Reading
                </option>
                <option value={SHELVES.WANT_TO_READ}>Want to Read</option>
                <option value={SHELVES.READ}>Read</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookInfo.title}</div>
          <div className="book-authors">{bookInfo?.authors.map((author, i) => i === bookInfo?.authors.length - 1 ? `${author}` : `${author}, `) }</div>
        </div>
      </li>
    )
}

export default BookCard;