window.addEventListener('load', () => {
    const form = document.querySelector("#new_task_form");
    const input = document.querySelector("#new_task_input");
    const tasks = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = input.value;
        if (!taskText) {
            alert("Please first add a task!");
            return;
        }

        const taskElement = document.createElement("div");
        taskElement.classList.add('task');


        // task content
        const taskContentElement = document.createElement("div");
        taskContentElement.classList.add("content");

        taskElement.appendChild(taskContentElement);

        const taskInputElement = document.createElement('input');
        taskInputElement.type = "text";
        taskInputElement.classList.add("text");
        taskInputElement.value = taskText;
        taskInputElement.setAttribute("readonly", "readonly");

        taskContentElement.appendChild(taskInputElement);


        // task actions
        const taskActionsElement = document.createElement("div");
        taskActionsElement.classList.add("actions");

        const taskEditElement = document.createElement("button");
        taskEditElement.classList.add("edit");
        taskEditElement.innerHTML = "Edit";

        const taskDeleteElement = document.createElement("button");
        taskDeleteElement.classList.add("delete");
        taskDeleteElement.innerHTML = "Delete";

        taskActionsElement.appendChild(taskEditElement);
        taskActionsElement.appendChild(taskDeleteElement);


        taskElement.appendChild(taskActionsElement);

        tasks.appendChild(taskElement);

        // reset input value
        input.value = "";


        // edit button
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


        // delete button
        taskDeleteElement.addEventListener("click", () => {
            tasks.removeChild(taskElement);
        });

    });


});