const express = require('express');
const todosRouter = express.Router();

// DB CONNECTION
const pool = require('../public/scripts/modules/pool.js');

console.log('we are inside todos router');

// GET

todosRouter.get('/', (req, res) => {
    console.log('against all odds, it worked!')
    const sqlText = `
      SELECT * FROM "todos"
    `
    pool.query(sqlText)
    .then((dbRes) => {
        console.log('here is what we got back:')
        console.log(dbRes.rows)
        // dbRes.rows should evaluate to something like:
        // [
        //  {
        //    id: 1,
        //    text: 'take out the trash',
        //    isComplete: false
        //  },
        //  {
        //    id: 2,
        //    text: 'eat supper',
        //    isComplete: false
        //  }
        // ]
})
.catch((dbErr) => {

})
})



// POST 





// DELETE






// PUT


module.exports = todosRouter;