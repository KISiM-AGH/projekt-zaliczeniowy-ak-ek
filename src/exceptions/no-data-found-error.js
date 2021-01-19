class NoDataFoundError extends Error {
    constructor(message) {
        super(message || 'No appropriate data found');
        this.status = 404;
    }

}
module.exports = NoDataFoundError;