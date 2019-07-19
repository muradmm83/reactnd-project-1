import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {

    state = {
        searchResult: [],
        typingTimeout: 0
    }

    query(term) {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState(currentState => ({
            ...currentState,
            typingTimeout: setTimeout(() => {
                BooksAPI.search(term)
                    .then(books => {
                        if (!books.error) {
                            let foundBooks = books.map(b => ({
                                id: b.id,
                                title: b.title,
                                authors: b.authors,
                                imageUrl: b.imageLinks.thumbnail,
                                shelf: 'none'
                            }));

                            foundBooks = foundBooks.map(fb => {
                                const book = this.props.books.find(b => fb.id === b.id);

                                return {
                                    ...fb,
                                    shelf: book ? book.shelf : fb.shelf
                                }
                            });

                            this.setState(currentState => ({
                                ...currentState,
                                searchResult: foundBooks
                            }));
                        }
                    });
            }, 550)
        }));


    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={e => this.query(e.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResult.map(b => (<Book key={b.id} book={b} />))}
                    </ol>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired
}

export default Search;