module.exports = {
    jwtSecret: '',      //klucz powinien być w zmiennej środowiskowej
    cookiesOptions: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'None',
        maxAge: 1000 * 60 * 60 * 24,         //czas przechowywania przez przeglądarkę
        httpOnly: true,
        signed: false,      //podpisane w celu weryfikacji

    }


}