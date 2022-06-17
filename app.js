const form = document.querySelector("#new_task_form");
const input = document.querySelector("#new_task_input");
const tasks = document.querySelector("#tasks");

let taskId = 0;


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value) {
        alert("Please first add a task!");
        return;
    }

    saveToLocalStorage(taskId++, input.value);
    let taskElement = createTaskElement(input.value);
    tasks.appendChild(taskElement);
    // reset input value
    input.value = "";
    addEventListenerForTaskEditElement(taskElement);
    addEventListenerForTaskDeleteElement(taskElement);

});

function createTaskElement(taskText) {
    const taskElement = document.createElement("div");
    taskElement.classList.add('task');

    taskElement.appendChild(createTaskContentElement(taskText));
    taskElement.appendChild(createTaskActionsElement());
    return taskElement;
}

function createTaskEditElement() {
    const taskEditElement = document.createElement("button");
    taskEditElement.classList.add("edit");
    taskEditElement.innerHTML = "Edit";
    return taskEditElement;
}

function createTaskDeleteElement() {
    const taskDeleteElement = document.createElement("button");
    taskDeleteElement.classList.add("delete");
    taskDeleteElement.innerHTML = "Delete";
    return taskDeleteElement;
}

function createTaskActionsElement() {
    const taskActionsElement = document.createElement("div");
    taskActionsElement.classList.add("actions");

    taskActionsElement.appendChild(createTaskEditElement());
    taskActionsElement.appendChild(createTaskDeleteElement());
    return taskActionsElement;
}

function createTaskInputElement(taskText) {
    const taskInputElement = document.createElement('input');
    taskInputElement.type = "text";
    taskInputElement.classList.add("text");
    taskInputElement.value = taskText;
    taskInputElement.setAttribute("readonly", "readonly");
    return taskInputElement;
}

function createTaskContentElement(taskText) {
    const taskContentElement = document.createElement("div");
    taskContentElement.classList.add("content");

    taskContentElement.appendChild(createTaskInputElement(taskText));
    return taskContentElement;
}


function addEventListenerForTaskEditElement(taskElement) {

    let taskInputElement = taskElement.childNodes[0].childNodes[0];
    let taskEditElement = taskElement.childNodes[1].childNodes[0];

    taskEditElement.addEventListener("click", () => {
        if (taskEditElement.innerText.toLowerCase() == "edit") {
            taskEditElement.innerText = "Save";
            taskInputElement.removeAttribute("readonly");
            taskInputElement.focus();
        } else {
            taskEditElement.innerText = "Edit";
            taskInputElement.setAttribute("readonly", "readonly");
        }
    });

}

function addEventListenerForTaskDeleteElement(taskElement) {

    let taskDeleteElement = taskElement.childNodes[1].childNodes[1];
    taskDeleteElement.addEventListener("click", () => {
        tasks.removeChild(taskElement);
    });
}


function getTodosLocalStorageJSON() {
    return JSON.parse(window.localStorage.getItem('todos'));
}

// assume todos are oblects like this object {1: 'todo1', 2: 'todo2', 3: 'todo3'}
function saveToLocalStorage(id, value) {
    console.log(value);
    let todo = JSON.parse(`{"${id}" : "${value}" }`);
    let todos = getTodosLocalStorageJSON();
    window.localStorage.setItem('todos', JSON.stringify({ ...todos, ...todo }));
}

function deleteFromLocalStorage(id) {
    let todos = getTodosLocalStorageJSON();
    delete todos[id];
    window.localStorage.setItem('todos', JSON.stringify({ ...todos}));
}


window.addEventListener('load', () => {
    let todos = getTodosLocalStorageJSON();
    if (todos) {
        for (let key in todos) {
            let taskElement = createTaskElement(todos[key]);
            tasks.appendChild(taskElement);
            // reset input value
            input.value = "";
            addEventListenerForTaskEditElement(taskElement);
            addEventListenerForTaskDeleteElement(taskElement);
        }
    }
});