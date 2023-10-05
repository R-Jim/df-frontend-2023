import ActionBar from "../bar/Action";
import { Book } from "../entity/Book";
import Button from "../form/Button";
import Modal from "../modal/Modal";

interface DeleteBookModalProp {
    book: Book;
    index: number;

    onDelete: Function;
    onClose: Function;
}

function DeleteBookModal(params: DeleteBookModalProp) {
    const toggle = params.book !== undefined;
    const bookName = toggle ? params.book.name : "";

    const onDelete = () => {
        try {
            let books: Book[] = []
            const booksDataFromStore = localStorage.getItem("books")
            if (booksDataFromStore != null) {
                books = (JSON.parse(booksDataFromStore));
            }
            books.splice(params.index, 1)

            localStorage.setItem("books", JSON.stringify(books))
        } catch (error) {
            console.error(error)
        }

        params.onDelete(params.index);
        params.onClose();
    }

    return (
        <Modal title="Delete book" show={toggle} onClose={() => params.onClose()}>
            <p>Do you want to delete <b>{bookName}</b> book?</p>
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