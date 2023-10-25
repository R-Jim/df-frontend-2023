'use client'

export class ResponseError extends Error {
    public code: number

    constructor(code: number, message: string) {
        super(`[${code}]: ${message}`)
        this.name = 'ResponseError'
        this.message = message
        this.code = code
    }
}
