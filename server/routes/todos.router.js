const express = require("express");
const todosRouter = express.Router();

// DB CONNECTION
const pool = require("../public/scripts/modules/pool.js");

// console.log("we are inside todos router");

// GET

todosRouter.get("/", (req, res) => {
  // console.log("against all odds, it worked!");
  const sqlText = `
      SELECT * FROM "todos" ORDER BY "id";
    `;
  pool
    .query(sqlText)
    .then((dbRes) => {
      // console.log("here is what we got back:");
      // console.log(dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {});
});

// POST
todosRouter.post("/", (req, res) => {
  let newTask = req.body;

  console.log("req.body:", req.body);

  const queryText = `
  INSERT INTO "todos" (title, description)
  VALUES ($1, $2)
  `;

  pool
    .query(queryText, [newTask.title, newTask.description])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

// DELETE

todosRouter.delete("/:id", (req, res) => {
  let idToDelete = req.params.id; // This is the id the client sends us in the url

  let mySqlQuery = `
  DELETE FROM "todos" WHERE id = $1;
  `;
  pool
    .query(mySqlQuery, [idToDelete])
    .then((response) => {
      console.log("delete request successful", idToDelete);
      res.sendStatus(202);
    })
    .catch((err) => {
      console.log(`delete request failed: ${idToDelete}`, err);
      res.sendStatus(500);
    });
});

// PUT

todosRouter.put("/:id", (req, res) => {
  let idToUpdate = req.params.id; // This is the id the client sends us in the url

  let mySqlQuery = `
  UPDATE "todos" SET "is_complete" = true WHERE id = $1;
  `;

  pool
    .query(mySqlQuery, [idToUpdate])
    .then((response) => {
      console.log("update request successful", idToUpdate);
      res.sendStatus(202);
    })
    .catch((err) => {
      console.log(`update request failed: ${idToUpdate}`, err);
      res.sendStatus(500);
    });
});

module.exports = todosRouter;
