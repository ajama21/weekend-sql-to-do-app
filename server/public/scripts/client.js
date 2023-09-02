console.log('js works')

$(document).ready(onReady);

function onReady(){
    console.log('jQuery works');

    $('#addTask').on('click', addTask)

};

function addTask(){
    console.log('addtask button is working');

}