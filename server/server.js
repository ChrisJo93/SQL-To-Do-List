const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const tasksRouter = require('./public/routes/tasks.router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/tasks', tasksRouter);

app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
