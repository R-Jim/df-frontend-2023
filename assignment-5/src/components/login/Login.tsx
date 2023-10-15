'use client'

import { createContext } from 'react'

interface User {
    Username: string
    Password: string
}

export const UserContext = createContext<User | undefined>(undefined)
