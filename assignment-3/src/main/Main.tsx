import { useState, useEffect } from 'react';

import './Main.css';
import ActionBar from '../component/bar/Action';
import Button from '../component/form/Button';
import Table from '../component/table/Table';
import DeleteBookModal from '../component/book/DeleteBookModal';
import AddBookModal from '../component/book/AddBookModal';
import { Book } from '../component/entity/Book';

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

const PAGE_SIZE = 5

function Main() {
    const [searchBookName, setSearchBookName] = useState('');
    const [booksState, setBooks] = useState<Book[]>([]);
    let books = booksState

    useEffect(() => {
        try {
            const booksDataFromStore = localStorage.getItem("books")
            if (booksDataFromStore != null) {
                setBooks(JSON.parse(booksDataFromStore));
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const [deleteIndex, setDeleteIndex] = useState(-1);
    if (books === undefined || books === null) {
        books = []
    }
    books = books.map((book, index) => {
        return {
            ...book,
            action: <button onClick={() => setDeleteIndex(index)}>Delete</button>
        };
    });


    const [currentPage, setCurrentPage] = useState(0);

    const filteredBooks = books.filter(({ name }) => name.includes(searchBookName));
    const total = filteredBooks.length;

    const currentBooksPage = filteredBooks.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const onDelete = (index: number) => {
        books.splice(index, 1);
        setBooks(books);
    };

    const [addBookToggle, setAddBookToggle] = useState(false);

    const onAdd = (book: Book) => {
        books.push(book);
        setBooks(books);
        const numberOfPages = Math.ceil(books.length / PAGE_SIZE)
        setCurrentPage(numberOfPages-1)

    };


    const genThreeBooks = () => {
        let books:Book[] = []
        const booksDataFromStore = localStorage.getItem("books")
        if (booksDataFromStore != null) {
            books = JSON.parse(booksDataFromStore);
        }
        books.push({ name: "Refactoring", author: "Martin Fowler", topic: "Programming" });
        books.push({ name: "Designing Data-Intensive Applications", author: "Martin Kleppmann", topic: "Database" });
        books.push({ name: "The Phoenix Project", author: "Gene Kim", topic: "DevOps" });
        try {
            localStorage.setItem("books", JSON.stringify(books))
            setBooks(books);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <ActionBar>
                <Button onClick={() => setAddBookToggle(true)} active>
                    Add book
                </Button>
                <input id="searchBookInput" placeholder="Search books" value={searchBookName} onChange={({ target }) => { setSearchBookName(target.value) }} />
                <Button onClick={genThreeBooks} active>
                    Gen 3 books
                </Button>
            </ActionBar>
            <Table mappings={bookTableMapping} items={currentBooksPage} total={total} pageSize={PAGE_SIZE} currentPage={currentPage} onChangePage={setCurrentPage} />
            <DeleteBookModal book={books[deleteIndex]} index={deleteIndex} onClose={() => { setDeleteIndex(-1) }} onDelete={onDelete} />
            <AddBookModal toggle={addBookToggle} onClose={() => setAddBookToggle(false)} onAdd={onAdd} />
        </main>
    );
};

export default Main;