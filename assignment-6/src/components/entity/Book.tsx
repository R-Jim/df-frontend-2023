export interface Topic {
    code: string
    id: number
    name: string
}

export interface Book {
    id: number
    name: string
    author: string
    topic: Topic
}
