import React from 'react'
import BookCard from '../BookCard/BookCard'

const BookShelf = ({ books, changeBookStatus, title }) => {
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
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

export default BookShelf