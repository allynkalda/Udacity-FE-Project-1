import React, { useState } from 'react'

const BookCard = ({
    bookInfo,
    changeBookStatus
}) => {
    const [ status, setStatus ] = useState(bookInfo.shelf)
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
              <select value={status} onChange={e => {
                  changeBookStatus(bookInfo, e.target.value)
                  setStatus(e.target.value)}}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookInfo.title}</div>
          <div className="book-authors">{bookInfo?.authors[0]}</div>
        </div>
      </li>
    )
}

export default BookCard;