import { getSession } from 'next-auth/react'
import axios from 'axios'
import { Book } from '../../../components/entity/Book'
import { ResponseError } from '../error'

export async function getBooks({ page, pageSize, query }: GetBooksRequest) {
    const session = await getSession()
    if (
        session === undefined ||
        session?.user === undefined ||
        session.user.secret === undefined
    ) {
        throw new ResponseError(401, 'not authenticated')
    }

    const { data } = await axios
        .get(
            `${process.env.NEXT_PUBLIC_API_URL}/books?page=${page}&pageSize=${pageSize}&query=${query}`,
            {
                headers: { Authorization: `Bearer ${session.user.secret}` },
                params: {
                    page,
                    pageSize,
                    query,
                },
            },
        )
        .catch((error) => {
            throw new ResponseError(
                error.response.data.status,
                error.response.data.message,
            )
        })

    return data
}

export async function getBook(bookID: number) {
    const session = await getSession()
    if (
        session === undefined ||
        session?.user === undefined ||
        session.user.secret === undefined
    ) {
        throw new ResponseError(401, 'not authenticated')
    }

    const { data } = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookID}`, {
            headers: { Authorization: `Bearer ${session.user.secret}` },
        })
        .catch((error) => {
            throw new ResponseError(
                error.response.data.status,
                error.response.data.message,
            )
        })

    return data
}

interface GetBooksRequest {
    page?: number
    pageSize?: number
    query?: string
}

export interface GetBooksResponse {
    data: Book[]
    metadata: {
        page: number
        pageSize: number
        totalPages: number
        totalRecords: number
    }
}

export async function createBook({ author, name, topicID }: CreateBookRequest) {
    const session = await getSession()
    if (
        session === undefined ||
        session?.user === undefined ||
        session.user.secret === undefined
    ) {
        throw new ResponseError(401, 'not authenticated')
    }

    const { data } = await axios
        .post(
            `${process.env.NEXT_PUBLIC_API_URL}/books`,
            {
                author,
                name,
                topicID,
            },
            {
                headers: { Authorization: `Bearer ${session.user.secret}` },
            },
        )
        .catch((error) => {
            throw new ResponseError(
                error.response.data.status,
                error.response.data.message,
            )
        })

    return data
}

interface CreateBookRequest {
    author: number
    name: string
    topicID?: number
}

export async function deleteBook(bookID: number) {
    const session = await getSession()
    if (
        session === undefined ||
        session?.user === undefined ||
        session.user.secret === undefined
    ) {
        throw new ResponseError(401, 'not authenticated')
    }

    const { data } = await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookID}`, {
            headers: { Authorization: `Bearer ${session.user.secret}` },
        })
        .catch((error) => {
            throw new ResponseError(
                error.response.data.status,
                error.response.data.message,
            )
        })

    return data
}
