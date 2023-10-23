export class ResponseError extends Error {
    constructor(code: number, message: string) {
        super(`[${code}]: ${message}`)
        this.name = 'ResponseError'
    }
}
