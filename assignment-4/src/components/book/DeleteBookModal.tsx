import ActionBar from "../bar/Action";
import { Book } from "../entity/Book";
import Button from "../form/Button";
import Modal from "../modal/Modal";

interface DeleteBookModalProp {
    book: Book | undefined;

    onDelete: Function;
    onClose: Function;
}

function DeleteBookModal(params: DeleteBookModalProp) {
    const toggle = params.book !== undefined;
    const bookName = toggle ? params.book?.name : "";

    const onDelete = () => {
        let deletedBook: Book | undefined = undefined
        try {
            let books: Book[] = []
            const booksDataFromStore = localStorage.getItem("books")
            if (booksDataFromStore != null) {
                books = (JSON.parse(booksDataFromStore));
            }
            for (let index = 0; index < books.length; index++) {
                const book = books[index];
                if (params.book !== undefined && book.id === params.book.id) {
                    deletedBook = book
                    books.splice(index, 1)
                    localStorage.setItem("books", JSON.stringify(books))
                    break
                }
            }
        } catch (error) {
            console.error(error)
        }

        if (deletedBook !== undefined) {
            params.onDelete(deletedBook);
        }
        params.onClose();
    }

    return (
        <Modal title="Delete book" show={toggle} onClose={() => params.onClose()}>
            <p className="p-2 pb-3">Do you want to delete <b>{bookName}</b> book?</p>
            <ActionBar>
                <Button onClick={() => params.onClose()} active>
                    Cancel
                </Button>
                <Button onClick={onDelete}>
                    Delete
                </Button>
            </ActionBar>
        </Modal>
    );
};

export default DeleteBookModal;