import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookList from './BookList';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    shelves: [
      { title: 'Currently Reading', name: 'currentlyReading' },
      { title: 'Want to Read', name: 'wantToRead' },
      { title: 'Read', name: 'read' }
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(currentState => {
          currentState.books = books.map(b => ({
            id: b.id,
            title: b.title,
            author: b.authors.join(', '),
            imageUrl: b.imageLinks.thumbnail,
            shelf: b.shelf
          }));

          return currentState;
        })
      })
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact render={() => (
          <BookList shelves={this.state.shelves} books={this.state.books} />
        )} />

        <Route path="/search" component={Search} />
      </BrowserRouter>

    )
  }
}



export default BooksApp
