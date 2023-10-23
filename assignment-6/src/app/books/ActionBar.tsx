'use client'

import { ChangeEventHandler, useState } from 'react'
import ActionBar from '../../components/bar/Action'
import Button from '../../components/form/Button'
import AddBookModal from '../../components/book/AddBookModal'

interface bookActionBarProp {
    onAdd: () => void

    searchBookName: string
    setSearchBookName: ChangeEventHandler<HTMLInputElement>
}

function BookActionBar(props: bookActionBarProp) {
    const [addBookToggle, setAddBookToggle] = useState(false)

    return (
        <>
            <ActionBar>
                <Button onClick={() => setAddBookToggle(true)} active>
                    Add book
                </Button>
                <input
                    id="searchBookInput"
                    placeholder="Search books"
                    value={props.searchBookName}
                    onChange={props.setSearchBookName}
                />
            </ActionBar>
            <AddBookModal
                toggle={addBookToggle}
                onAdd={props.onAdd}
                onClose={() => setAddBookToggle(false)}
            />
        </>
    )
}

export default BookActionBar
