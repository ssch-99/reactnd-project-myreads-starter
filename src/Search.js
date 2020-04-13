import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import {Link} from "react-router-dom";

class Search extends React.Component {

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }));

        if(this.state.query.length > 0){
            BooksAPI.search(query).then((books) => {
                if (books === undefined || books.error) {
                    books = []
                }
                console.log(books)
                this.setState(() => ({
                    books: books.filter((book) => {
                        return book.imageLinks !== undefined && book.authors !== undefined})
                }));
            });
        }
    }


    render() {
        const {books} = this.state;

        return (
            <div className="search-books">

                <div className="search-books-bar">
                    <Link to='/'><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.map((book) => {
                                return (<li key={book.id}><Book updateBook={this.props.updateBook} instance={book}/></li>)
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;
