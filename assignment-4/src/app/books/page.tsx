'use client'
import { useState, useEffect } from 'react';

import './page.css';
import { Book } from '../../components/entity/Book';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import BookActionBar from './ActionBar';
import BookTable from './BookTable';

const PAGE_SIZE = 5

interface queryParam {
    name: string
    value: string | null
}

const bookQueryParams: queryParam[] = [
    {
        name: "q",
        value: null,
    },
    {
        name: "page",
        value: null,
    },
]

function Main() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [searchBookName, setSearchBookName] = useState(searchParams.get('q'));
    const [books, setBooks] = useState<Book[]>([]);

    const [isBooksLoaded, setBooksLoaded] = useState(false);
    useEffect(() => {
        try {
            const booksDataFromStore = localStorage.getItem("books")
            if (booksDataFromStore != null) {
                setBooks(JSON.parse(booksDataFromStore));
            }
            setBooksLoaded(true)
        } catch (error) {
            console.error(error);
        }
    }, []);

    let pageNumberFromURL = 0
    const pageNumberParam = searchParams.get('page')
    if (pageNumberParam !== null) {
        try {
            pageNumberFromURL = parseInt(pageNumberParam) - 1
        } catch (error) { }
    }

    const [currentPage, setCurrentPage] = useState(pageNumberFromURL);

    const filteredBooks = books.filter(({ name }) => searchBookName !== null ? name.toLowerCase().includes(searchBookName.toLowerCase()) : true);
    const total = filteredBooks.length;

    const currentBooksPage = filteredBooks.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    useEffect(() => {
        if (isBooksLoaded && currentPage !== 0 && currentBooksPage.length === 0) {
            const numberOfPages = Math.ceil(total / PAGE_SIZE)
            setCurrentPage(numberOfPages - 1);
        }
    })

    const pushPath = (queryParams: queryParam[]) => {
        let path = pathname
        const queryParamURLs = queryParams.filter(({ value }) => value != null).map((param, index) => {
            if (index == 0) {
                return `?${param.name}=${param.value}`
            } else {
                return `&${param.name}=${param.value}`
            }
        })

        router.push(path + queryParamURLs.join(""))
    }

    const onSearch = ({ target: { value } }) => {
        bookQueryParams[0].value = value !== "" ? value : null
        if (currentPage > 0) {
            bookQueryParams[1].value = (currentPage + 1).toString()
        } else {
            bookQueryParams[1].value = null
        }

        setSearchBookName(value)
        pushPath(bookQueryParams)
    }

    const onChangePage = (pageNumber) => {
        bookQueryParams[0].value = searchBookName !== "" ? searchBookName : null
        if (pageNumber > 0) {
            bookQueryParams[1].value = (pageNumber + 1).toString()
        } else {
            bookQueryParams[1].value = null
        }
        setCurrentPage(pageNumber)
        pushPath(bookQueryParams)
    }

    const onAdd = (book: Book) => {
        const newBooks = Array.from(books)
        newBooks.push(book);
        setBooks(newBooks);
        const numberOfPages = Math.ceil(newBooks.length / PAGE_SIZE)
        setCurrentPage(numberOfPages-1)
    };

    return (
        <main>
            <BookActionBar setBooks={setBooks} searchBookName={searchBookName !== null ? searchBookName : ""} setSearchBookName={onSearch}  onAddBook={onAdd}/>
            <BookTable books={currentBooksPage} setBooks={setBooks} currentPage={currentPage} total={total} pageSize={PAGE_SIZE} onChangePage={onChangePage}/>
        </main>
    );
};

export default Main;