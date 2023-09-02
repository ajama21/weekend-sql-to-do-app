console.log('js works')

$(document).ready(onReady);

function onReady(){
    getTasks();
    console.log('jQuery works');

    $('#addTask').on('click', addTask)

};

function getTasks(){

    $.ajax({
        method: 'GET',
        url: '/todos'
    }).then(
        (res) => {
            console.log('GET tasks works:', res);
            let tasks = res;
            render(tasks);
        }).catch(
            (err) => {
                console.log('GET tasks err:', err);
            })
    // 
}// 

function render(tasks){
    

}