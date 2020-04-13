import React from "react";
import * as BooksAPI from "./BooksAPI";

class Book extends React.Component {

    render() {

        const {instance, updateBook} = this.props;

        return (<div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${instance.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select value={instance.shelf} onChange={(e) => updateBook(instance,e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{instance.title}</div>
            <div className="book-authors">{instance.authors}</div>
        </div>)
    }
}
export default Book;
