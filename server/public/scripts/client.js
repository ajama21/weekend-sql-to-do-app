// console.log("js works");
$(document).ready(onReady);

function onReady() {
  getTasks();
  // console.log("jQuery works");

  $("#newTask").on("click", addTask);
  $("#addTaskTable").on("click", ".delete_button", deleteTask);
  $("#addTaskTable").on("click", ".update_button", updateTask);
}

function getTasks() {
  $.ajax({
    method: "GET",
    url: "/todos",
  })
    .then((res) => {
      // console.log("GET tasks works:", res);
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
    // is_complete: $("#isComplete").val(),
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
    // console.log("task we are looking at:", task);

    let $newRow;

    if (task.is_complete === true) {
      $newRow = `<tr class="color_change">
      <td>${task.title}</td> 
      <td>${task.description}</td>
      <td>${task.is_complete}</td>
      <td><button class="delete_button">DELETE</button></td>
      <td><button class="update_button">UPDATE</button></td>
      </tr>`;
    } else {
      $newRow = `
      <tr>
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.is_complete}</td>
      <td><button class="delete_button">DELETE</button></td>
      <td><button class="update_button">UPDATE</button></td>
      </tr>`;
    }
    $newRow = $($newRow);
    $newRow.data("id", task.id);
    $("#addTaskTable").append($newRow);
  }
}

// DELETE

function deleteTask() {
  console.log("delete button clicked!");
  let idToDelete = $(this).parent().parent().data("id");
  console.log(idToDelete);

  $.ajax({
    method: "DELETE",
    url: `/todos/${idToDelete}`, // We pass the id to the server in url as a url parameter
  })
    .then((results) => {
      console.log(
        "delete successful, this item no longer exists: ",
        idToDelete
      );
      getTasks();
    })
    .catch((err) => {
      alert("Error on delete, id:", idToDelete);
    });
}

function updateTask() {
  console.log("update button clicked!");
  let idToUpdate = $(this).parent().parent().data("id");
  // console.log(idToUpdate);
  $.ajax({
    method: "PUT",
    url: `/todos/${idToUpdate}`, // We pass the id to the server in url as a url parameter
  })
    .then((results) => {
      // console.log(
      //   "update successful, your task is complete: ",
      //   idToUpdate
      // );
      getTasks();
      $(this).prop("disabled", true);
    })
    .catch((err) => {
      alert("Error on delete, id:", idToUpdate);
    });
}
