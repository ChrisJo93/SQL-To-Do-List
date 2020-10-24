$(document).ready(onReady);

function onReady() {
  $('.btn-submit').on('click', submitTask);
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
  console.log('in objectmaker', taskObject);
}

//api calls

function postTask(taskObject) {
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: taskObject,
  })
    .then(function (response) {})
    .catch(function (err) {
      console.log(err);
    });
}
