'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Book } from '../../components/entity/Book'
import BookActionBar from './ActionBar'
import BookTable from './BookTable'

const PAGE_SIZE = 5

interface queryParam {
    name: string
    value: string | null
}

const bookQueryprops: queryParam[] = [
    {
        name: 'q',
        value: null,
    },
    {
        name: 'page',
        value: null,
    },
]

function Main() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [searchBookName, setSearchBookName] = useState(searchParams.get('q'))
    const [books, setBooks] = useState<Book[]>([])

    const [isBooksLoaded, setBooksLoaded] = useState(false)
    useEffect(() => {
        try {
            const booksDataFromStore = localStorage.getItem('books')
            if (booksDataFromStore != null) {
                setBooks(JSON.parse(booksDataFromStore))
            }
            setBooksLoaded(true)
        } catch (error) {
            console.error(error)
        }
    }, [])

    let pageNumberFromURL = 0
    const pageNumberParam = searchParams.get('page')
    if (pageNumberParam !== null) {
        pageNumberFromURL = parseInt(pageNumberParam, 10) - 1
    }

    const [currentPage, setCurrentPage] = useState(pageNumberFromURL)

    const filteredBooks = books.filter(({ name }) =>
        searchBookName !== null
            ? name.toLowerCase().includes(searchBookName.toLowerCase())
            : true,
    )
    const total = filteredBooks.length

    const currentBooksPage = filteredBooks.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE,
    )

    useEffect(() => {
        if (
            isBooksLoaded &&
            currentPage !== 0 &&
            currentBooksPage.length === 0
        ) {
            const numberOfPages = Math.ceil(total / PAGE_SIZE)
            setCurrentPage(numberOfPages - 1)
        }
    }, [isBooksLoaded, currentPage, currentBooksPage.length, total])

    const pushPath = (queryprops: queryParam[]) => {
        const queryParamURLs = queryprops
            .filter(({ value }) => value != null)
            .map((param, index) => {
                if (index === 0) {
                    return `?${param.name}=${param.value}`
                }
                return `&${param.name}=${param.value}`
            })

        router.push(`${pathname}${queryParamURLs.join('')}`)
    }

    const onSearch = ({ target: { value } }) => {
        bookQueryprops[0].value = value !== '' ? value : null
        if (currentPage > 0) {
            bookQueryprops[1].value = (currentPage + 1).toString()
        } else {
            bookQueryprops[1].value = null
        }

        setSearchBookName(value)
        pushPath(bookQueryprops)
    }

    const onChangePage = (pageNumber) => {
        bookQueryprops[0].value = searchBookName !== '' ? searchBookName : null
        if (pageNumber > 0) {
            bookQueryprops[1].value = (pageNumber + 1).toString()
        } else {
            bookQueryprops[1].value = null
        }
        setCurrentPage(pageNumber)
        pushPath(bookQueryprops)
    }

    const onAdd = (book: Book) => {
        const newBooks = Array.from(books)
        newBooks.push(book)
        setBooks(newBooks)
        const numberOfPages = Math.ceil(newBooks.length / PAGE_SIZE)
        setCurrentPage(numberOfPages - 1)
    }

    return (
        <main className="m-2 flex flex-col gap-4 [&>div]:overflow-scroll">
            <BookActionBar
                setBooks={setBooks}
                searchBookName={searchBookName !== null ? searchBookName : ''}
                setSearchBookName={onSearch}
                onAddBook={onAdd}
            />
            <BookTable
                books={currentBooksPage}
                setBooks={setBooks}
                currentPage={currentPage}
                total={total}
                pageSize={PAGE_SIZE}
                onChangePage={onChangePage}
            />
        </main>
    )
}

export default Main
