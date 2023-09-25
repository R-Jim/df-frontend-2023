import { useState } from 'react';

import Modal from '../../component/modal/Modal';
import Form from '../../component/form/Form';
import Button from '../../component/form/Button';
import { InputText, InputSelect } from '../../component/form/Input';
import ActionBar from '../../component/bar/Action';

const BOOK_TOPIC_OPTIONS = ["Programming", "Database", 'DevOps']

const DEFAULT_BOOK_FORM = {
    name: "",
    author: "",
    topic: BOOK_TOPIC_OPTIONS[0],
}

function AddBookModal(params) {
    const toggle = params.toggle;
    const [addBookForm, setAddBookForm] = useState(DEFAULT_BOOK_FORM);

    const onClose = () => {
        setAddBookForm(DEFAULT_BOOK_FORM);
        params.onClose();
    };

    const onCreate = (e) => {
        try {
            var books = JSON.parse(localStorage.getItem("books"));
            books.push(addBookForm);

            localStorage.setItem("books", JSON.stringify(books));
        } catch (error) {
            console.error(error);
        }

        params.onAdd(addBookForm)
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