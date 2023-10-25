import { getSession } from 'next-auth/react'
import axios from 'axios'
import { Topic } from '../../../components/entity/Book'
import { ResponseError } from '../error'

export async function getTopics() {
    const session = await getSession()
    if (
        session === undefined ||
        session?.user === undefined ||
        session.user.secret === undefined
    ) {
        throw new ResponseError(401, 'not authenticated')
    }

    const { data } = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
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

export interface GetTopicsResponse {
    data: Topic[]
}
