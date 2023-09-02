const express = require("express");
const todosRouter = express.Router();

// DB CONNECTION
const pool = require("../public/scripts/modules/pool.js");

console.log("we are inside todos router");

// GET

todosRouter.get("/", (req, res) => {
  console.log("against all odds, it worked!");
  const sqlText = `
      SELECT * FROM "todos"
    `;
  pool
    .query(sqlText)
    .then((dbRes) => {
      // console.log("here is what we got back:");
      // console.log(dbRes.rows);
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {});
});

// POST
todosRouter.post("/", (req, res) => {
  let newTask = req.body;

  console.log("req.body:", req.body);

  const queryText = `
  INSERT INTO "todos" (title, description, is_complete)
  VALUES ($1, $2, $3)
  `;

  pool
    .query(queryText, [newTask.title, newTask.description, newTask.is_complete])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

// DELETE

// PUT

module.exports = todosRouter;
