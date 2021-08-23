// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete', 
//     password: '19960630'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sqlize = new Sequelize('node-complete', 'root', '19960630', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sqlize;