import { useState, useEffect } from 'react';

import ActionBar from '../../component/bar/Action';
import Button from '../../component/form/Button';
import Table from '../../component/table/Table';
import DeleteBookModal from '../../component/book/DeleteBookModal';
import AddBookModal from '../../component/book/AddBookModal';

import './Main.css';

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
    var [books, setBooks] = useState([]);

    useEffect(() => {
        try {
            const books = JSON.parse(localStorage.getItem("books"));
            setBooks(books);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const [deleteIndex, setDeleteIndex] = useState(-1);
    books = books.map((book, index) => {
        return {
            ...book,
            action: <button onClick={() => setDeleteIndex(index)}>Delete</button>
        };
    });

    const [currentPage, setCurrentPage] = useState(0);

    const filteredBooks = books.filter(({ name }) => name.includes(searchBookName));
    const total = filteredBooks.length;
    if (currentPage !== 0 && total < currentPage*PAGE_SIZE){
        setCurrentPage(0);
    }

    const currentBooksPage = filteredBooks.slice(currentPage*PAGE_SIZE, (currentPage+1)*PAGE_SIZE);

    const onDelete = (index) => {
        books.splice(index, 1);
        setBooks(books);
    };
    
    const [addBookToggle, setAddBookToggle] = useState(false);
    
    const onAdd = (book) => {
        books.push(book);
        setBooks(books);
    };
    

    return (
        <main>
            <ActionBar>
                <Button onClick={() => setAddBookToggle(true)} active>
                    Add book
                </Button>
                <input id="searchBookInput" placeholder="Search books" value={searchBookName} onChange={({ target }) => { setSearchBookName(target.value) }} />
            </ActionBar>
            <Table mapping={bookTableMapping} items={currentBooksPage} total={total} pageSize={PAGE_SIZE} currentPage={currentPage} onChangePage={setCurrentPage}/>
            <DeleteBookModal book={books[deleteIndex]} index={deleteIndex} onClose={() => { setDeleteIndex(-1) }} onDelete={onDelete} />
            <AddBookModal toggle={addBookToggle} onClose={() => setAddBookToggle(false)} onAdd={onAdd} />
        </main>
    );
};

export default Main;