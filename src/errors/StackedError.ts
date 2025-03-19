class StackedError extends Error {
    error: {
        fieldName: string,
        errorMessage: string
    };

    constructor(error: {
        fieldName: string,
        errorMessage: string
    },
        message: string) {
        super(message)
        this.name = 'Client error'
        this.error = error

        this.stack = (new Error()).stack;
    }
}

export default StackedError