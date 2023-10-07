'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "../../components/table/Table";
import DeleteBookModal from "../../components/book/DeleteBookModal";
import { Book } from "../../components/entity/Book";

const bookTableMapping = [
    {
        display: 'Name',
        key: 'name',
    },
    {
        display: 'Author',
        key: 'author',
    },
    {
        display: 'Topic',
        key: 'topic',
    },
    {
        display: 'Action',
        key: 'action',
    }
]

interface bookTableProp {
    books: Book[]
    setBooks: Function

    currentPage: number
    pageSize: number
    total: number
    onChangePage: Function
}

function BookTable(params: bookTableProp) {
    const router = useRouter()

    const [deleteBook, setDeleteBook] = useState<Book>();

    const books = params.books.map((book) => {
        return {
            ...book,
            action: <div>
                <button onClick={() => setDeleteBook(book)}>Delete</button>&nbsp;|&nbsp;
                {book?.id !== undefined ? <button onClick={() => router.push(`/books/${encodeURIComponent(book?.id)}`)}>View</button> : ""}
            </div>
        };
    });

    const onDelete = (index: number) => {
        const booksDataFromStore = localStorage.getItem("books")
        if (booksDataFromStore != null) {
            const books = JSON.parse(booksDataFromStore);
            books.splice(index, 1);
            params.setBooks(books)
        }
    };

    return (
        <>
            <Table mappings={bookTableMapping} items={books} total={params.total} pageSize={params.pageSize} currentPage={params.currentPage} onChangePage={params.onChangePage} />
            <DeleteBookModal book={deleteBook} onClose={() => { setDeleteBook(undefined) }} onDelete={onDelete} />
        </>
    )
}

export default BookTable;