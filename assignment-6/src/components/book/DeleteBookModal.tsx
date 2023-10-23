import { toast } from 'react-toastify'
import { signOut } from 'next-auth/react'
import { deleteBook } from '../../app/api/book/route'
import ActionBar from '../bar/Action'
import { Book } from '../entity/Book'
import Button from '../form/Button'
import Modal from '../modal/Modal'

interface DeleteBookModalProp {
    book: Book | undefined

    onDelete: (books: Book[], deletedBook: Book) => void
    onClose: () => void
}

function DeleteBookModal(params: DeleteBookModalProp) {
    const toggle = params.book !== undefined
    const bookName = toggle ? params.book?.name : ''

    const onDelete = () => {
        try {
            if (params.book !== undefined) {
                deleteBook(params.book.id)
                    .catch((error) => {
                        toast.error(error)
                        if (error.code === 401) {
                            signOut()
                        }
                    })
                    .then(() => toast.success('book deleted'))
            }
        } catch (error) {
            console.error(error)
        }
        params.onClose()
    }

    return (
        <Modal
            title="Delete book"
            show={toggle}
            onClose={() => params.onClose()}
        >
            <p className="p-2 pb-3">
                Do you want to delete <b>{bookName}</b> book?
            </p>
            <ActionBar>
                <Button onClick={() => params.onClose()} active>
                    Cancel
                </Button>
                <Button onClick={onDelete}>Delete</Button>
            </ActionBar>
        </Modal>
    )
}

export default DeleteBookModal
