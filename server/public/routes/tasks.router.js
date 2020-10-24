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

router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const taskData = req.body;
  const taskQuery = `UPDATE "tasks" SET "complete" = $1 WHERE "id" = $2;`;
  pool
    .query(taskQuery, [taskData.complete, taskId])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const taskQuery = `DELETE FROM "Tasks" WHERE id=$1;`;
  const queryArrayData = [taskId];
  pool
    .query(taskQuery, queryArrayData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
