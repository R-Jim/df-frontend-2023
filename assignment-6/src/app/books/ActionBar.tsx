'use client'

import { ChangeEventHandler, useState } from 'react'
import ActionBar from '../../components/bar/Action'
import { Book } from '../../components/entity/Book'
import Button from '../../components/form/Button'
import AddBookModal from '../../components/book/AddBookModal'

interface bookActionBarProp {
    setBooks: (data: Book[]) => void

    searchBookName: string
    setSearchBookName: ChangeEventHandler<HTMLInputElement>
}

function BookActionBar(params: bookActionBarProp) {
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
                    value={params.searchBookName}
                    onChange={params.setSearchBookName}
                />
            </ActionBar>
            <AddBookModal
                toggle={addBookToggle}
                onClose={() => setAddBookToggle(false)}
            />
        </>
    )
}

export default BookActionBar
