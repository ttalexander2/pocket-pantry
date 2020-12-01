/*
This file provides error handling for errors that may occur in the back end of
the code. Whether the login is not valid or there is an issue connecting
with the databasem an exception is raised from this file.
*/

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
