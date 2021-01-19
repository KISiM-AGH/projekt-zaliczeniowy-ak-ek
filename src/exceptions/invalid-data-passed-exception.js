class InvalidDataPassedException extends Error {
    constructor(message) {
        super(message || "Data passed is not valid/sufficient for this operation");
        this.status = 400;
    }
}
module.exports = InvalidDataPassedException;