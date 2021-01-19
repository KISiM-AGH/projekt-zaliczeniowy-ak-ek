class NoScoresError extends Error {
    constructor(message) {
        super(message || 'You have no scores yet! Play to get some.');
        this.status = 404;
    }

}
module.exports = NoScoresError;