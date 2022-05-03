const mysql = require('mysql2');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'user',
    database: 'saboroso',
    password: '!Avengers23'

});

module.exports = connection;