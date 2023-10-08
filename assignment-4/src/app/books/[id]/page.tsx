'use client'

import { useEffect, useState } from 'react'
import { useRouter, notFound } from 'next/navigation'
import { Book } from '../../../components/entity/Book'
import Button from '../../../components/form/Button'
import DeleteBookModal from '../../../components/book/DeleteBookModal'

function View({ params }: { params: { id: string } }) {
    const router = useRouter()

    const [book, setBook] = useState<Book>()

    useEffect(() => {
        try {
            const booksDataFromStore = localStorage.getItem('books')
            if (booksDataFromStore != null) {
                const books: Book[] = JSON.parse(booksDataFromStore)

                for (let index = 0; index < books.length; index++) {
                    const book = books[index]
                    if (book.id === params.id) {
                        setBook(book)
                        break
                    }
                }
                return notFound()
            }
        } catch (error) {
            console.error(error)
        }
    }, [params.id])

    const [deleteBook, setDeleteBook] = useState<Book>()
    const onDelete = () => {
        router.back()
    }

    return (
        <div className="p-5 [&>button]:text-left [&>button]:min-w-fit [&>button]:pl-0">
            <Button type="button" onClick={router.back}>
                &lt; Back
            </Button>
            <div>
                <h1 className="text-lg font-bold pb-3">{book?.name}</h1>
                <p>
                    <b>Author:</b> {book?.author}
                </p>
                <p>
                    <b>Topic:</b> {book?.topic}
                </p>
            </div>
            <Button
                type="button"
                onClick={() => {
                    setDeleteBook(book)
                }}
            >
                <span className="underline decoration-secondary-color">
                    Delete
                </span>
            </Button>
            <DeleteBookModal
                book={deleteBook}
                onClose={() => {
                    setDeleteBook(undefined)
                }}
                onDelete={onDelete}
            />
        </div>
    )
}

export default View
