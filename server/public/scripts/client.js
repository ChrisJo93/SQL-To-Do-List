$(document).ready(onReady);

function onReady() {
  $('.btn-submit').on('click', submitTask);
  $('.task-Table').on('click', '.btn-delete', deleteHandler);
  $('.task-Table').on('click', '.checkBox', putTask);
  getTask();
}

function submitTask() {
  const task = $('.task-input').val();
  const notes = $('.note-input').val();
  let complete = false;
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
    if (task.complete === true) {
      taskTable.append(`<tr class="completeCheck">
    <td>${task.task}</td>
    <td>${task.notes}</td>
    <td><input type="checkbox" checked="true" class="checkBox" data-id="${task.id}"></td>
    <td><button class="btn-delete" data-id="${task.id}">Delete</button></td>
    </tr>`);
    } else {
      taskTable.append(`<tr>
    <td>${task.task}</td>
    <td>${task.notes}</td>
    <td><input type="checkbox" class="checkBox" data-id="${task.id}"></td>
    <td><button class="btn-delete" data-id="${task.id}">Delete</button></td>
    </tr>`);
    }
  }
}

function deleteHandler() {
  const taskId = $(this).data('id');
  deleteTask(taskId);
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

function putTask() {
  let taskId = $(this).data('id');
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskId}`,
    data: { complete: true },
  })
    .then((response) => {
      getTask();
    })
    .catch(function (err) {
      console.log(err);
      alert('Something wrong in put request');
    });
}
