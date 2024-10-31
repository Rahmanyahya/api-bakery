export class ErrorHandler extends Error {
    constructor(public status: number, public message: string, public filename?: any)  {
        super(message)    
    }
}