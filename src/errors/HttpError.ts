class HttpError extends Error {
    public errors: any;

    constructor(errors: any) {
        super("HTTP error occurred");
        this.name = "HttpError";
        this.errors = errors;

        this.stack = (new Error()).stack;
    }
}

export default HttpError