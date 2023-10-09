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

function DeleteBookModal(props: DeleteBookModalProp) {
    const toggle = props.book !== undefined;
    const bookName = toggle ? props.book.name : "";

    const onDelete = () => {
        try {
            let books: Book[] = []
            const booksDataFromStore = localStorage.getItem("books")
            if (booksDataFromStore != null) {
                books = (JSON.parse(booksDataFromStore));
            }
            books.splice(props.index, 1)

            localStorage.setItem("books", JSON.stringify(books))
        } catch (error) {
            console.error(error)
        }

        props.onDelete(props.index);
        props.onClose();
    }

    return (
        <Modal title="Delete book" show={toggle} onClose={() => props.onClose}>
            <p>Do you want to delete <b>{bookName}</b> book?</p>
            <ActionBar>
                <Button onClick={() => props.onClose} active>
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