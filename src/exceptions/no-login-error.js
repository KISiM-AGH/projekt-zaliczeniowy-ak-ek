class NoLoginError extends Error {
    constructor(message) {
        super(message || 'Log in first to do that');
        this.status = 400;
    }

}
module.exports = NoLoginError;