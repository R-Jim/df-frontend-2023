/* eslint-disable-next-line */
import { Session } from 'next-auth'
/* eslint-disable-next-line */
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user?: User
    }

    interface User {
        id: string
        secret: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        secret: string
    }
}
