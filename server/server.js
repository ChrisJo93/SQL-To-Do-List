const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const tasksRouter = '';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', tasksRouter);

app.use(expreds.static('server/public'));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
