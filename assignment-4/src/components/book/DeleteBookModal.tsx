import { Book } from '../entity/Book'
import Button from '../form/Button'
import Modal from '../modal/Modal'

interface DeleteBookModalProp {
    book: Book | undefined

    onDelete: (books: Book[], deletedBook: Book) => void
    onClose: () => void
}

function DeleteBookModal(props: DeleteBookModalProp) {
    const toggle = props.book !== undefined
    const bookName = toggle ? props.book?.name : ''

    const onDelete = () => {
        let deletedBook: Book | undefined
        try {
            let books: Book[] = []
            const booksDataFromStore = localStorage.getItem('books')
            if (booksDataFromStore != null) {
                books = JSON.parse(booksDataFromStore)
            }
            for (let index = 0; index < books.length; index++) {
                const book = books[index]
                if (props.book !== undefined && book.id === props.book.id) {
                    deletedBook = book
                    const oldBooks = [...books]
                    books.splice(index, 1)
                    localStorage.setItem('books', JSON.stringify(books))
                    props.onDelete(oldBooks, deletedBook)
                    props.onClose()
                    break
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal
            title="Delete book"
            show={toggle}
            onClose={() => props.onClose()}
        >
            <p className="p-2 pb-3">
                Do you want to delete <b>{bookName}</b> book?
            </p>
            <div className="flex items-center flex-col-reverse sm:flex-row-reverse gap-2.5 [&>button]:w-full sm:[&>button]:w-auto">
                <Button onClick={() => props.onClose()} active>
                    Cancel
                </Button>
                <Button onClick={onDelete}>Delete</Button>
            </div>
        </Modal>
    )
}

export default DeleteBookModal
