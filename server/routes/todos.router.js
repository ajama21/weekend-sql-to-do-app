// const express = require('express');
// const todosRouter = express.Router();

// // DB CONNECTION
// const pool = require('../public/scripts/modules/pool.js');

// console.log('we are inside todos router');

// // GET

// todosRouter.get('/', (req, res) => {
//     console.log('we are inside the get request')
//         let queryText = 'SELECT * FROM "koalas";'
    
//         pool.query(queryText).then(
//             (result) => {
//                 res.send(result.rows)
//             }
//         ).catch(
//             (err) => {
//                 console.log(`Error making query ${queryText}`, err);
//                 res.sendStatus(500);
//             }
//         )
//     });



// // POST 





// // DELETE






// // PUT


// module.exports = todosRouter;