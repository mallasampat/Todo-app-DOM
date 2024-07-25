let todoDataSection = document.getElementById("todos-container");
let inputData = document.getElementById("todo-input-bar");
let saveButton = document.getElementById("save-todo");
let todosList = [];

function handleSaveButton() {
    let data = inputData.value;
    if(data.length === 0) {
        if(saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");
    } else {
        saveButton.classList.remove("disabled");
    }
}
 
function handleAddTodo() {
    let data = inputData.value;
    if(data.length === 0) return;
    let obj = { data: data, status: "In Progress" };
    todosList.push(obj);
    addTodo(obj, todosList.length);
    inputData.value = '';
}

function updateStatus(event) {
    let val = event.target.id;
    let index = val.split("-")[1];
    let status = document.getElementById(`todo-status-${index}`);
    if(status.textContent === 'Finished') {
        status.textContent = 'In Progress';
        let finishedButton = document.getElementById(`btn-${index}`);
        finishedButton.textContent = 'Finished';
        finishedButton.classList.remove("btn-warning");
        finishedButton.classList.add("btn-success");
        todosList[index - 1].status = 'In Progress';
    } else {
        status.textContent = 'Finished';
        let finishedButton = document.getElementById(`btn-${index}`);
        finishedButton.textContent = 'Pending';
        finishedButton.classList.remove("btn-success");
        finishedButton.classList.add("btn-warning");
        todosList[index - 1].status = 'Finished';
    }
}

function deleteTodo(event) {
    let val = event.target.id;
    let index = val.split("-")[2];
    todoDataSection.innerHTML = '';
    todosList.splice(index - 1, 1);
    todosList.forEach((todo, index) => addTodo(todo, index + 1));
}

function handlePendingTodos() {
    let allTodos = [...todosList];
    let pendingTodos = todosList.filter((todo) => todo.status === "In Progress");
    let pendingTodosButton = document.getElementById("get-todos");
    if(pendingTodos.length > 0) {
        if(pendingTodosButton.innerText === "Show Pending Todos") {
            pendingTodosButton.textContent = "Show All todos"
            todoDataSection.innerHTML = '';
            pendingTodos.forEach((todo, index) => addTodo(todo, index + 1));
        } else {
            pendingTodosButton.textContent = "Show Pending Todos"
            todoDataSection.innerHTML = '';
            allTodos.forEach((todo, index) => addTodo(todo, index + 1));
        }
    }
}

function handleEditTodo(event) {
    let val = event.target.id;
    let index = val.split("-")[2];
    let editBtn = document.getElementById(`edit-btn-${index}`);
    let editBtnList = document.getElementsByClassName("btn-info");
    let statusBtnList = document.getElementsByClassName("btn-status");
    let deleteBtnList = document.getElementsByClassName("btn-danger");
    let inputBar = document.getElementById("todo-input-bar");
    inputBar.setAttribute("disabled", true);
    let saveButton = document.getElementById("save-todo");
    saveButton.classList.add("disabled");
    let getPendingTodosButton = document.getElementById("get-todos");
    getPendingTodosButton.classList.add("disabled");
    //Maje sure all other buttons are disabled while editing.
    //Disable All other Edit buttons except the current edit button
    Array.from(editBtnList)
    .filter((_, idx) => idx !== index - 1)
    .forEach((btn) => btn.classList.add("disabled"));
    //Disable all the Status buttons including the current index button
    Array.from(statusBtnList)
    .forEach((btn) => btn.classList.add("disabled"));
    //Disable all the Delete buttons including the current index button
    Array.from(deleteBtnList)
    .forEach((btn) => btn.classList.add("disabled"));
    if(editBtn.textContent === 'Edit') {
        editBtn.textContent = 'Save';
        let todoDetail = document.getElementById(`todo-detail-${index}`);
        todoDetail.remove();
        let hiddenInput = document.getElementById(`hidden-input-${index}`);
        hiddenInput.type = 'text';
        hiddenInput.value = todoDetail.textContent;
        hiddenInput.classList.add("form-control");
        hiddenInput.style.width = "55%";
    } else {
        inputBar.removeAttribute("disabled");
        saveButton.classList.remove("disabled");
        getPendingTodosButton.classList.remove("disabled");
        let hiddenInput = document.getElementById(`hidden-input-${index}`);
        if(hiddenInput.value.length > 0) {
            hiddenInput.type = 'hidden';
        }
        todoDataSection.innerHTML = '';
        todosList[index - 1].data = hiddenInput.value;
        console.log('todosList:',todosList);
        todosList.forEach((todo, index) => addTodo(todo, index + 1));
    }
}

function addTodo(todoData, serialNumber) {
    let rowDiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let todoDelete = document.createElement("button");
    let todoFinished = document.createElement("button");
    let todoEdit = document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");

    //adding classes
    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item", "d-flex", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-action", "d-flex", "justify-content-start", "gap-2");
    todoDelete.classList.add("btn", "btn-danger");
    todoFinished.classList.add("btn", "btn-success", "btn-status");
    todoEdit.classList.add("btn", "btn-info");
    hiddenInput.type = "hidden";

    let arr = document.getElementsByClassName("todo-item");
    todoStatus.id = `todo-status-${arr.length + 1}`;
    rowDiv.id = `row-${arr.length + 1}`;
    todoDetail.id = `todo-detail-${arr.length + 1}`;
    hiddenInput.id = `hidden-input-${arr.length + 1}`;

    todoNumber.textContent = serialNumber;
    todoDetail.textContent = todoData.data;
    todoStatus.textContent = todoData.status;
    todoDelete.textContent = 'Delete';
    todoEdit.textContent = 'Edit';
    if(todoData.status === 'Finished') {
        todoFinished.textContent = 'Pending';
        todoFinished.classList.remove("btn-success");
        todoFinished.classList.add("btn-warning");
    } else {
        todoFinished.textContent = 'Finished';
        todoFinished.classList.remove("btn-warning");
        todoFinished.classList.add("btn-success");
    }
    todoFinished.id = `btn-${arr.length + 1}`;
    todoDelete.id = `delete-btn-${arr.length + 1}`;
    todoEdit.id = `edit-btn-${arr.length + 1}`
    
    todoFinished.onclick = updateStatus;
    todoDelete.onclick = deleteTodo;
    todoEdit.onclick = handleEditTodo;

    todoActions.appendChild(todoEdit);
    todoActions.appendChild(todoFinished);
    todoActions.appendChild(todoDelete);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataSection.appendChild(rowDiv);
}