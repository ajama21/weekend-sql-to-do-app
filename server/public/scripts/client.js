// console.log("js works");
$(document).ready(onReady);

function onReady() {
  getTasks();
  //   console.log("jQuery works");

  $("#newTask").on("click", addTask);
  $(".update-button").on("click", updateIsComplete);
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
      <td>
        <select class="is-complete-dropdown">
          <option value="false" ${
            task.is_complete === "false" ? "selected" : ""
          }>False</option>
          <option value="true" ${
            task.is_complete === "true" ? "selected" : ""
          }>True</option>
        </select>
        <button class="update-button">Update</button>
      </td>
      <td><button class="delete_button">❌</button></td>
    </tr>
    `);
    $newRow.data("id", task.id);
    $("#addTaskTable").append($newRow);
  }
}

// function updateIsComplete() {
//   let taskId = $(this).closest("tr").data("id");
//   let newIsCompleteValue = $(this).siblings(".is-complete-dropdown").val();

//   updateTask(taskId, newIsCompleteValue);
// }

function updateTask(taskIdToUpdate, newIsCompleteValue) {
  let taskUpdateObject = {
    is_complete: newIsCompleteValue,
  };

  console.log("taskUpdateObject:", taskUpdateObject);

  $.ajax({
    method: "PUT",
    url: `/todos/${idToUpdate}`,
    data: taskUpdateObject,
  })
    .then(function (response) {
      console.log("Update task worked, task ID:", taskIdToUpdate);
      getTasks();
    })
    .catch(function (error) {
      alert("Error on updating task:", error);
    });
}

// Modify the updateIsComplete function to call updateTask
function updateIsComplete() {
  let taskIdToUpdate = $(this).closest("tr").data("id");
  let newIsCompleteValue = $(this).siblings(".is-complete-dropdown").val();

  console.log("taskIdToUpdate:", taskIdToUpdate);
  console.log("newIsCompleteValue:", newIsCompleteValue);

  updateTask(taskIdToUpdate, newIsCompleteValue);
}


function deleteTask() {
  // We don't want to remove it from the DOM.
  // We want to destroy it's very essence.
  // Whipe it from existance.
  // We NEED the ID to make sure we are deleting the right thing.    

  // We stored the id in a data attribute called 'id' on the table row
  // 'this' is the delete button.
  // We go up to the table row (this.parent.parent) and grab the id with the .data getter
  let idToDelete = $(this).parent().parent().data('id');
  console.log(idToDelete);

  $.ajax({
      method: 'DELETE',
      url: `/todos/${idToDelete}` // We pass the id to the server in url as a url parameter
  })
      .then(
          (results) => {
              console.log('delete successful, this item no longer exists: ', idToDelete);
              getTasks();
          }
      )
      .catch(
          (err) => {
              alert("Error on delete, id:", idToDelete);
          }
      )
}