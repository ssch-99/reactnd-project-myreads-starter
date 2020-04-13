import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from "./BooksAPI";
import Book from  "./Book"
import {Link, Route} from "react-router-dom";
import Search from "./Search";
class BooksApp extends React.Component {
  state = {
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
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
    updateBook = (book,shelf) => {

        BooksAPI.update(book,shelf).then(() => {
            BooksAPI.getAll().then((books) => {
                console.log(books)
                this.setState(() => ({
                        books
                    })
                )
            });
        });
    }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={({history}) => (
        <Search updateBook={this.updateBook}/>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.books.filter((book) => book.shelf === "currentlyReading").map((book) => {
                          return (<li key={book.id}><Book updateBook={this.updateBook} instance={book}/></li>)
                        })
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.books.filter((book) => book.shelf === "wantToRead").map((book) => {
                          return (<li key={book.id}><Book updateBook={this.updateBook} instance={book}/></li>)
                        })
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.books.filter((book) => book.shelf === "read").map((book) => {
                          return (<li key={book.id}><Book updateBook={this.updateBook} instance={book}/></li>)
                        })
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
                <Link to='/search' className='open-search'><button>Add a book</button></Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
