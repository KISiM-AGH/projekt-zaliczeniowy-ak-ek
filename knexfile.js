// Update with your config settings.
const path = require('path')
module.exports = {


    client: 'mysql',
    connection: {
      host : 'localhost',
        user : 'root',
        database : 'graczeiwynikisudoku'
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'migrations')
    }


};
