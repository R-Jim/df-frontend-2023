import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../modal/Modal';
import Form from '../form/Form';
import InputText from '../form/InputText';
import InputSelect from '../form/InputSelect';
import ActionBar from '../bar/Action';
import Button from '../form/Button';
import { Book } from '../entity/Book';

const BOOK_TOPIC_OPTIONS = ["Programming", "Database", 'DevOps']

const DEFAULT_BOOK_FORM = {
    name: "",
    author: "",
    topic: BOOK_TOPIC_OPTIONS[0],
}

interface AddBookModalProp {
    toggle: boolean;

    onClose: Function;
    onAdd: Function;
}

function AddBookModal(params: AddBookModalProp) {
    const toggle = params.toggle;
    const [addBookForm, setAddBookForm] = useState(DEFAULT_BOOK_FORM);

    const onClose = () => {
        setAddBookForm(DEFAULT_BOOK_FORM);
        params.onClose();
    };

    const onCreate = (e) => {
        const book = { ...addBookForm, id: uuidv4() }
        try {
            let books: Book[] = []
            const booksDataFromStore = localStorage.getItem("books")
            if (booksDataFromStore != null) {
                books = (JSON.parse(booksDataFromStore));
            }
            books.push(book);

            localStorage.setItem("books", JSON.stringify(books));
        } catch (error) {
            console.error(error);
        }

        params.onAdd(book)
        onClose();
        e.preventDefault();
    };



    const onChange = ({ target: { name, value } }) => {
        setAddBookForm({ ...addBookForm, [name]: value })
    };

    return (
        <Modal title="Add book" show={toggle} onClose={onClose}>
            <Form onSubmit={onCreate}>
                <InputText title="Name" name="name" value={addBookForm.name} onChange={onChange} required />
                <InputText title="Author" name="author" value={addBookForm.author} onChange={onChange} required />
                <InputSelect title="Topic" name="topic" options={["Programming", "Database", 'DevOps']} value={addBookForm.topic} onChange={onChange} required />
                <ActionBar>
                    <Button type="submit" active>
                        Create
                    </Button>
                </ActionBar>
            </Form>
        </Modal>
    );
};

export default AddBookModal;