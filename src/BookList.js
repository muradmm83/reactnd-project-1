import React, { Component } from 'react';

import BookShelf from './BookShelf';

class BookList extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.props.shelves.map(shelf => (<BookShelf shelfTitle={shelf.title} books={this.props.books.filter(b => b.shelf === shelf.name)} />))}
                    </div>
                </div>
                <div className="open-search">
                    <button >Add a book</button>
                </div>
            </div>
        )
    }
}

export default BookList;