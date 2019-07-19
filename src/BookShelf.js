import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

function BookShelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map(b => (
                        <Book key={b.id} book={b} onUpdateShelf={(book, shelf) => props.onUpdateShelf(book, shelf)} />
                    ))}
                </ol>
            </div>
        </div>
    );
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
}

export default BookShelf;