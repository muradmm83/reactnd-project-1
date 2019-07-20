import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import noThumb from './icons/no-thumb.png';

import BookList from './BookList';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    shelves: [
      { title: 'Currently Reading', name: 'currentlyReading' },
      { title: 'Want to Read', name: 'wantToRead' },
      { title: 'Read', name: 'read' }
    ],
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    BooksAPI.getAll()
      .then(books =>
        this.setState(currentState => {
          currentState.books = books.map(b => ({
            id: b.id,
            title: b.title,
            authors: b.authors,
            imageUrl: b.imageLinks ? b.imageLinks.thumbnail : noThumb,
            shelf: b.shelf
          }));

          return currentState;
        })
      )
  }

  updateShelf(book, shelf) {
    const self = this;

    BooksAPI.update(book, shelf)
      .then(() => {
        self.loadBooks();
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact render={() => (
          <BookList shelves={this.state.shelves} books={this.state.books} onUpdateShelf={(book, shelf) => this.updateShelf(book, shelf)} />
        )} />

        <Route path="/search" render={({ history }) => (
          <Search books={this.state.books} onUpdateShelf={(book, shelf) => {
            this.updateShelf(book, shelf);
            history.push('/');
          }} />
        )} />
      </BrowserRouter>

    )
  }
}



export default BooksApp
