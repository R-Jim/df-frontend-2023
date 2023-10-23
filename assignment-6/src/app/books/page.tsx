'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { signOut } from 'next-auth/react'
import { Book } from '../../components/entity/Book'
import BookActionBar from './ActionBar'
import BookTable from './BookTable'
import { GetBooksResponse, getBooks } from '../api/book/route'

const PAGE_SIZE = 5

interface queryParam {
    name: string
    value: string | null
}

const bookQueryParams: queryParam[] = [
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

    let pageNumberFromURL = 0
    const pageNumberParam = searchParams.get('page')
    if (pageNumberParam !== null) {
        pageNumberFromURL = parseInt(pageNumberParam, 10) - 1
    }
    const [currentPage, setCurrentPage] = useState(pageNumberFromURL)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        getBooks({
            page: currentPage,
            pageSize: PAGE_SIZE,
            query: searchBookName ?? '',
        })
            .catch((error) => {
                toast.error(error)
                if (error.code === 401) {
                    signOut()
                }
            })
            .then((response: GetBooksResponse) => {
                setBooks(response.data)
                setTotal(response.metadata.totalRecords)
            })
    }, [currentPage, searchBookName])

    const pushPath = (queryParams: queryParam[]) => {
        const queryParamURLs = queryParams
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
        bookQueryParams[0].value = value !== '' ? value : null
        if (currentPage > 0) {
            bookQueryParams[1].value = (currentPage + 1).toString()
        } else {
            bookQueryParams[1].value = null
        }

        setSearchBookName(value)
        pushPath(bookQueryParams)
    }

    const onChangePage = (pageNumber) => {
        bookQueryParams[0].value = searchBookName !== '' ? searchBookName : null
        if (pageNumber > 0) {
            bookQueryParams[1].value = (pageNumber + 1).toString()
        } else {
            bookQueryParams[1].value = null
        }
        setCurrentPage(pageNumber)
        pushPath(bookQueryParams)
    }

    return (
        <main className="m-2 flex flex-col gap-4 [&>div]:overflow-scroll">
            <BookActionBar
                setBooks={setBooks}
                searchBookName={searchBookName !== null ? searchBookName : ''}
                setSearchBookName={onSearch}
            />
            <BookTable
                books={books}
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
