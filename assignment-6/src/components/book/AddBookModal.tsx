'use client'

import { FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import Modal from '../modal/Modal'
import Form from '../form/Form'
import { Topic } from '../entity/Book'
import { GetTopicsResponse, getTopics } from '../../app/api/topic/route'
import { createBook } from '../../app/api/book/route'

interface AddBookModalProp {
    toggle: boolean

    onClose: () => void
}

function AddBookModal(props: AddBookModalProp) {
    const [topics, setTopics] = useState<Topic[]>([])

    useEffect(() => {
        getTopics()
            .catch((error) => {
                toast.error(error)
                if (error.code === 401) {
                    signOut()
                }
            })
            .then((response: GetTopicsResponse) => {
                setTopics(response.data)
            })
    }, [])

    const { toggle } = props

    const onClose = () => {
        props.onClose()
    }

    const onCreate: SubmitHandler<FieldValues> = (data) => {
        createBook({
            name: data['name'],
            author: data['author'],
            topicID: parseInt(data['topic'], 10),
        })
            .catch((error) => toast.error(error))
            .then(() => toast.success('Add book success'))
        onClose()
    }

    return (
        <Modal title="Add book" show={toggle} onClose={onClose}>
            <Form
                defaultValues={{
                    name: '',
                    author: '',
                    topic: 0,
                }}
                onSubmit={onCreate}
                fields={[
                    {
                        title: 'Name(*)',
                        name: 'name',
                        type: 'text',
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
                        type: 'text',
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
                        type: 'select',
                        options: [
                            {
                                id: 0,
                                name: '--- Please select a topic ---',
                            },
                            ...topics,
                        ],
                        registerOptions: {
                            required: 'Topic is required',
                            validate: (value) =>
                                topics.some(
                                    (option) => `${option.id}` === value,
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
