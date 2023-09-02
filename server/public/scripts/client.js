// console.log("js works");

$(document).ready(onReady);

function onReady() {
  getTasks();
//   console.log("jQuery works");

  $("#addTask").on("click", addTask);
}

function getTasks() {
  $.ajax({
    method: "GET",
    url: "/todos",
  })
    .then((res) => {
      console.log("GET tasks works:", res);
      let tasks = res;
      render(tasks);
    })
    .catch((err) => {
      console.log("GET tasks err:", err);
    });
  //
} //

function addTask(event) {
  event.preventDefault();
  let taskReceivedAsObject = {
    title: $('#title').val(),
    description: $('#description').val(),
    is_complete: $('#isComplete').val()
}
    console.log('taksReceivedAsObject is:', taskReceivedAsObject);

    $.ajax({
        type: 'POST',
        url: '/todos',
        data: {
            title: "title", 
            description: "description",
            is_complete: "boolean"
        }
    }).then (function (response){
        $('#title').val(''),
        $('#description').val(''),
        $('#isComplete').val('')
        getTasks();
    });
}




function render(tasks) {}
