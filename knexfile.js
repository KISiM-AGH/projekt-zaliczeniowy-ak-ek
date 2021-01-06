// Update with your config settings.
const path = require('path')
module.exports = {


    client: 'mysql',
    connection: {
      host : 'sql7.freesqldatabase.com',
        user : 'sql7385403',
        password : '3tMUaxPDf3',
        database : 'sql7385403'
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'migrations')
    }


};
