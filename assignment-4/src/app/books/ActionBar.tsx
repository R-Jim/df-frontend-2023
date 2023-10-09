'use client'

import { ChangeEventHandler, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Book } from '../../components/entity/Book'
import Button from '../../components/form/Button'
import AddBookModal from '../../components/book/AddBookModal'

interface bookActionBarProp {
    setBooks: (data: Book[]) => void
    onAddBook: (data: Book) => void

    searchBookName: string
    setSearchBookName: ChangeEventHandler<HTMLInputElement>
}

function BookActionBar(props: bookActionBarProp) {
    const [addBookToggle, setAddBookToggle] = useState(false)

    const genThreeBooks = () => {
        let books: Book[] = []
        const booksDataFromStore = localStorage.getItem('books')
        if (booksDataFromStore != null) {
            books = JSON.parse(booksDataFromStore)
        }
        books.push({
            id: uuidv4(),
            name: 'Refactoring',
            author: 'Martin Fowler',
            topic: 'Programming',
        })
        books.push({
            id: uuidv4(),
            name: 'Designing Data-Intensive Applications',
            author: 'Martin Kleppmann',
            topic: 'Database',
        })
        books.push({
            id: uuidv4(),
            name: 'The Phoenix Project',
            author: 'Gene Kim',
            topic: 'DevOps',
        })
        try {
            localStorage.setItem('books', JSON.stringify(books))
            props.setBooks(books)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="flex items-center flex-col-reverse sm:flex-row-reverse gap-2.5 [&>input]:px-[8.25px] [&>input]:p-2.5 [&>input]:rounded [&>input]:border-[1.5px] [&>input]:border-border-color [&>input]:w-full sm:[&>input]:w-52 [&>button]:w-full sm:[&>button]:w-auto">
                <Button onClick={() => setAddBookToggle(true)} active>
                    Add book
                </Button>
                <input
                    id="searchBookInput"
                    placeholder="Search books"
                    value={props.searchBookName}
                    onChange={props.setSearchBookName}
                />
                <Button onClick={genThreeBooks} active>
                    Gen 3 books
                </Button>
            </div>
            <AddBookModal
                toggle={addBookToggle}
                onClose={() => setAddBookToggle(false)}
                onAdd={props.onAddBook}
            />
        </>
    )
}

export default BookActionBar
