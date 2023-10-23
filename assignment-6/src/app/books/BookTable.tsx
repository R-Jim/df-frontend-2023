'use client'

import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import Table from '../../components/table/Table'
import DeleteBookModal from '../../components/book/DeleteBookModal'
import { Book } from '../../components/entity/Book'

const bookTableMapping = [
    {
        display: 'Name',
        key: 'name',
    },
    {
        display: 'Author',
        key: 'author',
    },
    {
        display: 'Topic',
        key: 'topic.name',
    },
    {
        display: 'Action',
        key: 'action',
    },
]

interface bookTableProp {
    books: Book[]
    setBooks: Dispatch<SetStateAction<Book[]>>

    currentPage: number
    pageSize: number
    total: number
    onChangePage: (pageNumber: number) => void
}

function BookTable(params: bookTableProp) {
    const router = useRouter()

    const [deleteBook, setDeleteBook] = useState<Book>()

    const books = params.books.map((book) => {
        return {
            ...book,
            action: (
                <div>
                    <button onClick={() => setDeleteBook(book)}>Delete</button>
                    &nbsp;|&nbsp;
                    {book?.id !== undefined ? (
                        <button
                            onClick={() =>
                                router.push(
                                    `/books/${encodeURIComponent(book?.id)}`,
                                )
                            }
                        >
                            View
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            ),
        }
    })

    const onDelete = (books: Book[], deletedBook: Book) => {
        for (let index = 0; index < books.length; index++) {
            const book = books[index]
            if (book !== undefined && book.id === deletedBook.id) {
                books.splice(index, 1)
                params.setBooks(books)
                break
            }
        }
    }

    return (
        <>
            <Table
                mappings={bookTableMapping}
                items={books}
                total={params.total}
                pageSize={params.pageSize}
                currentPage={params.currentPage}
                onChangePage={params.onChangePage}
            />
            <DeleteBookModal
                book={deleteBook}
                onClose={() => {
                    setDeleteBook(undefined)
                }}
                onDelete={onDelete}
            />
        </>
    )
}

export default BookTable
