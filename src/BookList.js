import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';

function BookList(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {props.shelves.map(shelf => (
                        <BookShelf
                            key={shelf.name}
                            shelfTitle={shelf.title}
                            books={props.books.filter(b => b.shelf === shelf.name)}
                            onUpdateShelf={(book, shelf) => props.onUpdateShelf(book, shelf)} />
                    ))}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    )
}

BookList.propTypes = {
    shelves: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
}

export default BookList;