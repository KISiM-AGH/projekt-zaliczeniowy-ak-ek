class NoAuthorizationError extends Error{
    constructor(message){
        super(message || 'Log in first to do that');
        this.status = 401;
    }
}

module.exports = NoAuthorizationError;