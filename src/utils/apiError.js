class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = "",
    ) {
        super(message)
        this.statusCode = statusCode
    }
}

export { ApiError }