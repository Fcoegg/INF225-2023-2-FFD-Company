const {Pool} = require('pg');

const pool = new Pool({ 
    user: 'postgres',
    password: 'nezumi56',
    host:'localhost',
    port: 5432,
    database:'proyectosoft'
})

module.exports = pool;