class TakenError extends Error {
    constructor(message) {
        super(message || "This parameter is not unique!");
        this.status = 400;
    }
}

module.exports = TakenError;