import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Modal from '../modal/Modal'
import Form from '../form/Form'
import InputText from '../form/InputText'
import InputSelect from '../form/InputSelect'
import Button from '../form/Button'
import { Book } from '../entity/Book'

const BOOK_TOPIC_OPTIONS = ['Programming', 'Database', 'DevOps']

const DEFAULT_BOOK_FORM = {
    name: '',
    author: '',
    topic: BOOK_TOPIC_OPTIONS[0],
}

interface AddBookModalProp {
    toggle: boolean

    onClose: () => void
    onAdd: (book: Book) => void
}

function AddBookModal(props: AddBookModalProp) {
    const { toggle } = props
    const [addBookForm, setAddBookForm] = useState(DEFAULT_BOOK_FORM)

    const onClose = () => {
        setAddBookForm(DEFAULT_BOOK_FORM)
        props.onClose()
    }

    const onCreate = (e) => {
        const book = { ...addBookForm, id: uuidv4() }
        try {
            let books: Book[] = []
            const booksDataFromStore = localStorage.getItem('books')
            if (booksDataFromStore != null) {
                books = JSON.parse(booksDataFromStore)
            }
            books.push(book)

            localStorage.setItem('books', JSON.stringify(books))
        } catch (error) {
            console.error(error)
        }

        props.onAdd(book)
        onClose()
        e.preventDefault()
    }

    const onChange = ({ target: { name, value } }) => {
        setAddBookForm({ ...addBookForm, [name]: value })
    }

    return (
        <Modal title="Add book" show={toggle} onClose={onClose}>
            <Form onSubmit={onCreate}>
                <InputText
                    title="Name"
                    name="name"
                    value={addBookForm.name}
                    onChange={onChange}
                    required
                />
                <InputText
                    title="Author"
                    name="author"
                    value={addBookForm.author}
                    onChange={onChange}
                    required
                />
                <InputSelect
                    title="Topic"
                    name="topic"
                    options={['Programming', 'Database', 'DevOps']}
                    value={addBookForm.topic}
                    onChange={onChange}
                    required
                />
                <div className="flex items-center flex-col-reverse sm:flex-row-reverse gap-2.5 [&>button]:w-full sm:[&>button]:w-auto">
                    <Button type="submit" active>
                        Create
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddBookModal
