class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
      }
}

class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidTokenError";
      }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
      }
}

module.exports = {
    AuthenticationError,
    InvalidTokenError,
    DatabaseError
}