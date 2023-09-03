// console.log("js works");
$(document).ready(onReady);

function onReady() {
  getTasks();
  //   console.log("jQuery works");

  $("#newTask").on("click", addTask);
  $('#newTask').on('click', '.delete_button', deleteTask)
}

function getTasks() {
  $.ajax({
    method: "GET",
    url: "/todos",
  })
    .then((res) => {
      console.log("GET tasks works:", res);
      let tasksFromServer = res;
      render(tasksFromServer);
    })
    .catch((err) => {
      console.log("GET tasks err:", err);
    });
  //
} //

function addTask(event) {
  event.preventDefault();
  let taskReceivedAsObject = {
    title: $("#title").val(),
    description: $("#description").val(),
    is_complete: $("#isComplete").val(),
  };
  console.log("taksReceivedAsObject is:", taskReceivedAsObject);

  $.ajax({
    type: "POST",
    url: "/todos",
    data: taskReceivedAsObject,
  }).then(function (response) {
    getTasks();
    $("#title").val(""), $("#description").val(""), $("#isComplete").val("");
    getTasks();
  });
}

function render(tasksFromServer) {
  $("#addTaskTable").empty();

  for (let task of tasksFromServer) {
    console.log("task we are looking at:", task);

    let $newRow = $(`
    <tr>
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td><button class="delete_button">❌</button></td>
    </tr>
    `);
    $newRow.data("id", task.id);
    $("#addTaskTable").append($newRow);
  }
}


function deleteTask() {
  console.log('delete button was clicked!')
};


