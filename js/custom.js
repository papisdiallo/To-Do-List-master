// Costum js 

// all the queryselectors
const refresher = document.querySelector('.clear');
const date = document.querySelector("#date");
const input = document.querySelector("#input");
const ulTodoList = document.querySelector("#list");


// Let's create the list of OBJECTS that will all the todos
let myTodoListItems = []
let todoId = 0 // allow to set an id for every new item by incrementation....



// class names so it will be easy to work with them
var Complete = "fa-check-circle";
var Uncomplete = "fa-circle-thin";
var LineThrough = "lineThrough";


// functions 
function addTodo(todo, id, done, trash) { // 
    if (trash) { return; } // We want to make sure that the code below won't run...
    var DONE = done ? Complete : Uncomplete;
    var LINETHROUGH = done ? LineThrough : "";
    var li = `<li class="item">
                <i class="co fa ${DONE}" id="${id}" role="complete"></i>
                <p class="text ${LINETHROUGH}">${todo}</p>
                <i class="fa fa-trash-o de" id="${id}" role="delete"></i>
            </li>`
    var ulElement = document.querySelector("#list");
    ulElement.insertAdjacentHTML("beforeend", li);
}

function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    // Update the list of items also
    myTodoListItems[element.id].trash = true;
};

function completeTodo(element) {
    element.classList.toggle(Complete);
    element.classList.toggle(Uncomplete);
    element.parentNode.querySelector(".text").classList.toggle(LineThrough);
    // Updating the list of todos also
    myTodoListItems[element.id].done = myTodoListItems[element.id].done ? false : true;
}

function loadData(array) {
    array.forEach(todo => {
        addTodo(todo.todo, todo.id, todo.done, todo.trash);
    });
}

// eventListeners 
document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') { // check is the user pressed the key Enter first
        var todo = input.value
        if (todo && !(todo.trim() === "")) { // see if the input has a value and it is not an empty string...
            addTodo(todo, todoId, false, false)
            myTodoListItems.push({
                "todo": todo, "id": todoId, "done": false, "trash": false,
            })
            // let's set the local storage so the todos are present event after a refresh
            localStorage.setItem("TODOS", JSON.stringify(myTodoListItems))
            todoId++; // Do not forget to increment the id for the next todo
        }
        input.value = "";  // Reset the input value to an empty string...

    }
});

// Add the event listener for the new created items...

ulTodoList.addEventListener('click', (e) => {
    var role = e.target.attributes.role
    if (role) {
        if (role.value === "complete") {
            completeTodo(e.target) // e.target will return <i class="co fa ${DONE}" id="${id}" role="complete"></i>
        } else if (role.value === "delete") {
            removeTodo(e.target) // e.target will return <i class="fa fa-trash-o de" id="${id}" role="delete"></i>
        }
    }
    // let's set the local storage so the todos are present event after a refresh
    localStorage.setItem("TODOS", JSON.stringify(myTodoListItems))
})

// clearing all the todos in our list 
refresher.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

// Now let's get the data in the local storage
var data = localStorage.getItem("TODOS");
if (data) {
    myTodoListItems = JSON.parse(data);
    todoId = myTodoListItems.length
    loadData(myTodoListItems);
} else { // this means there is no data so we need to initialize it to render it to the UI
    myTodoListItems = []
    id = 0;
};

//Now let's populate the date
var today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", {
    "weekday": "long", "day": "numeric", "month": "short",
})