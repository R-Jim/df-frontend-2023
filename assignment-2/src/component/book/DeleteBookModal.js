import Modal from '../../component/modal/Modal';

import ActionBar from '../../component/bar/Action';
import Button from '../../component/form/Button';

function DeleteBookModal(params) {
    const toggle = params.book !== undefined;
    const bookName = toggle ? params.book.name : "";

    const onDelete = () => {
        try {
            var books = JSON.parse(localStorage.getItem("books"))
            books.splice(params.index, 1)

            localStorage.setItem("books", JSON.stringify(books))
        } catch (error) {
            console.error(error)
        }

        params.onDelete(params.index);
        params.onClose();
    }

    return (
        <Modal title="Delete book" show={toggle} onClose={params.onClose}>
            <p>Do you want to delete <b>{bookName}</b> book?</p>
            <ActionBar>
                <Button onClick={params.onClose} active>
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