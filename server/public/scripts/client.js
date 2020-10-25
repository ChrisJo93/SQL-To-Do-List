$(document).ready(onReady);

function onReady() {
  $('.btn-submit').on('click', submitTask);
  $('.task-Table').on('click', '.btn-delete', deleteHandler);
  $('.task-Table').on('click', '.test', test);
  getTask();
}

function submitTask() {
  const task = $('.task-input').val();
  const notes = $('.note-input').val();
  const complete = false;
  const taskObject = {
    task,
    notes,
    complete,
  };
  postTask(taskObject);
}

function taskRender(listOfTasks) {
  // $('.task-input').val('')
  // $('.note-input').val('');
  const taskTable = $('.task-Table');
  const tasksLoop = listOfTasks;
  taskTable.empty();
  for (let task of tasksLoop) {
    //need to hook checkbox to task.complete property
    taskTable.append(`<tr>
    <td>${task.task}</td>
    <td>${task.notes}</td>
    <td><input type="checkbox" class="test" data-test="${task.complete}"></td>
    <td><button class="btn-delete" data-id="${task.id}">Delete</button></td>
    </tr>`);
  }
}

function deleteHandler() {
  const taskId = $(this).data('id');
  deleteTask(taskId);
}

function test() {
  const testing = $(this).data('test');
  updateTask(testing);
}

function updateTask(testing) {
  console.log(testing);
  testing = true;
}

//api calls

function postTask(taskObject) {
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: taskObject,
  })
    .then(function (response) {
      getTask();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getTask() {
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then(function (response) {
      taskRender(response);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function deleteTask(taskId) {
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`,
  })
    .then((deleteMessage) => {
      getTask();
    })
    .catch((err) => {
      console.log(err);
      alert('oh crap');
    });
}
