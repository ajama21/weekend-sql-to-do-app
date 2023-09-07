const pg = require('pg');

const pool = new pg.Pool({
    database: 'todos',

    host: 'localhost',

    port: 5432
    
});

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// {
//     host: PGHOST,
//     port: 5432,
//     database: PGDATABASE,
//     user: PGUSER,
//     password: PGPASSWORD,
//     ssl: {
//         rejectUnauthorized: false
//     }



// Spit out a console log when the pool connects
// successfully:
pool.on('connect', () => {
    console.log('The magical pool thing connected to your postgres database. :)');
})

// Spit out a console log when the pool errors:
pool.on('error', (error) => {
    console.log('The magical pool has errored. Bummer.', error);
})

module.exports = pool;