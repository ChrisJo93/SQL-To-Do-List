const express = require('express');
const router = express.Router();
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
  database: 'TO-DO',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 10000,
});

router.get('/', (req, res) => {
  const queryTasks = `SELECT * FROM "Tasks";`;
  pool
    .query(queryTasks)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in GET /tasks ${error}`);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(`In /tasks with`, req.body);
  const taskToAdd = req.body;
  const taskQuery = `INSERT INTO "Tasks" ("task" , "notes" , "complete") VALUES ($1, $2, $3);`;
  pool
    .query(taskQuery, [taskToAdd.task, taskToAdd.notes, taskToAdd.complete])
    .then((responseFromDatabase) => {
      console.log(responseFromDatabase);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /tasks ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
