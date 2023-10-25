'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { signOut } from 'next-auth/react'
import { Book } from '../../../components/entity/Book'
import Button from '../../../components/form/Button'
import DeleteBookModal from '../../../components/book/DeleteBookModal'
import { getBook } from '../../api/book'

function View({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [book, setBook] = useState<Book>()

    useEffect(() => {
        try {
            getBook(parseInt(params.id, 10))
                .catch((error) => {
                    switch (error.code) {
                        case 401:
                            signOut()
                            break
                        case 404:
                            router.push('/books/not-found')
                            break
                        default:
                            toast.error(error.message)
                            break
                    }
                })
                .then((response) => {
                    if (response !== undefined) {
                        setBook(response.data)
                    }
                })
        } catch (error) {
            console.error(error)
        }
    }, [params.id, router])

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
                    <b>Topic:</b> {book?.topic?.name}
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
