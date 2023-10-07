'use client'

import { ChangeEventHandler, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ActionBar from "../../components/bar/Action";
import { Book } from "../../components/entity/Book";
import Button from "../../components/form/Button";
import AddBookModal from "../../components/book/AddBookModal";

interface bookActionBarProp {
    setBooks: Function
    onAddBook: Function

    searchBookName: string
    setSearchBookName: ChangeEventHandler<HTMLInputElement>
}

function BookActionBar(params: bookActionBarProp) {
    const [addBookToggle, setAddBookToggle] = useState(false);

    const genThreeBooks = () => {
        let books: Book[] = []
        const booksDataFromStore = localStorage.getItem("books")
        if (booksDataFromStore != null) {
            books = JSON.parse(booksDataFromStore);
        }
        books.push({ id: uuidv4(), name: "Refactoring", author: "Martin Fowler", topic: "Programming" });
        books.push({ id: uuidv4(), name: "Designing Data-Intensive Applications", author: "Martin Kleppmann", topic: "Database" });
        books.push({ id: uuidv4(), name: "The Phoenix Project", author: "Gene Kim", topic: "DevOps" });
        try {
            localStorage.setItem("books", JSON.stringify(books))
            params.setBooks(books);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <ActionBar>
                <Button onClick={() => setAddBookToggle(true)} active>
                    Add book
                </Button>
                <input id="searchBookInput" placeholder="Search books" value={params.searchBookName} onChange={params.setSearchBookName} />
                <Button onClick={genThreeBooks} active>
                    Gen 3 books
                </Button>
            </ActionBar>
            <AddBookModal toggle={addBookToggle} onClose={() => setAddBookToggle(false)} onAdd={params.onAddBook} />
        </>
    )
}

export default BookActionBar;