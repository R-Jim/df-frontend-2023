import { v4 as uuidv4 } from 'uuid'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import Modal from '../modal/Modal'
import Form from '../form/Form'
import { Book } from '../entity/Book'

const BOOK_TOPIC_OPTIONS = ['Programming', 'Database', 'DevOps']

export const DEFAULT_BOOK_FORM = {
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

    const onClose = () => {
        props.onClose()
    }

    const onCreate: SubmitHandler<FieldValues> = (data) => {
        try {
            const book: Book = {
                id: uuidv4(),
                name: data['name'],
                author: data['author'],
                topic: data['topic'],
            }
            let books: Book[] = []
            const booksDataFromStore = localStorage.getItem('books')
            if (booksDataFromStore != null) {
                books = JSON.parse(booksDataFromStore)
            }
            books.push(book)

            localStorage.setItem('books', JSON.stringify(books))
            props.onAdd(book)
        } catch (error) {
            console.error(error)
        }
        onClose()
    }

    return (
        <Modal title="Add book" show={toggle} onClose={onClose}>
            <Form
                defaultValues={{
                    name: '',
                    author: '',
                    topic: BOOK_TOPIC_OPTIONS[0],
                }}
                onSubmit={onCreate}
                fields={[
                    {
                        title: 'Name(*)',
                        name: 'name',
                        type: 'TEXT',
                        registerOptions: {
                            required: 'Name is required',
                            minLength: {
                                value: 5,
                                message: 'Name must have at least 5 characters',
                            },
                        },
                    },
                    {
                        title: 'Author(*)',
                        name: 'author',
                        type: 'TEXT',
                        registerOptions: {
                            required: 'Author is required',
                            pattern: {
                                value: /^[a-zA-Z\s]*$/,
                                message:
                                    'Author must have only letters and spaces',
                            },
                        },
                    },
                    {
                        title: 'Topic',
                        name: 'topic',
                        type: 'SELECT',
                        options: BOOK_TOPIC_OPTIONS,
                        registerOptions: {
                            required: 'Topic is required',
                            validate: (value) =>
                                BOOK_TOPIC_OPTIONS.some(
                                    (option) => option === value,
                                ) || 'Topic invalid',
                        },
                    },
                ]}
                actions={[
                    {
                        type: 'submit',
                        title: 'Create',
                        active: true,
                    },
                ]}
            />
        </Modal>
    )
}

export default AddBookModal
