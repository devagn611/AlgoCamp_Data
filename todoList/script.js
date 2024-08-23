function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || { todosList: [] };
  return todos;
}

function addTodosToLocalStorage(todo) {
  const todos = loadTodos();
  todos.todosList.push({ ...todo, id: todos.todosList.length });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function refreshTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodosInHtml(todo) {
  const todoList = document.getElementById("todoList");
  const todoItem = document.createElement("li");

  const textDiv = document.createElement("div");
  textDiv.classList.add("todoText");

  if (todo.iscomplete) {
    textDiv.classList.add("completed");
  }

  todoItem.setAttribute("data-id", todo.id);

  textDiv.textContent = todo.text;
  todoItem.classList.add("todoItem");

  const wrapper = document.createElement("div");
  wrapper.classList.add("todoButtons");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");
  editBtn.addEventListener("click", editTodo);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", deleteTodo);

  const completedBtn = document.createElement("button");
  completedBtn.textContent = todo.iscomplete ? "Reset" : "Completed";
  completedBtn.classList.add("completedBtn");
  completedBtn.addEventListener("click", toggleTodo);

  wrapper.appendChild(editBtn);
  wrapper.appendChild(deleteBtn);
  wrapper.appendChild(completedBtn);
  todoItem.appendChild(textDiv);
  todoItem.appendChild(wrapper);
  todoList.appendChild(todoItem);
}

function executeFilterAction(event) {
  const element = event.target;
  const value = element.getAttribute("data-filter");
  const todoList = document.getElementById("todoList");
  const todos = loadTodos();

  todoList.innerHTML = "";

  todos.todosList.forEach((todo) => {
    if (value === "all" || 
        (value === "pending" && !todo.iscomplete) || 
        (value === "completed" && todo.iscomplete)) {
      addTodosInHtml(todo);
    }
  });
}

function resetTodosInHtml(todos) {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  todos.todosList.forEach((todo) => {
    addTodosInHtml(todo);
  });
}

function toggleTodo(event) {
  const todoItem = event.target.closest('.todoItem');
  const todoId = todoItem.getAttribute("data-id");
  const todos = loadTodos();
  todos.todosList = todos.todosList.map(todo => 
    todo.id == todoId ? {...todo, iscomplete: !todo.iscomplete} : todo
  );
  refreshTodos(todos);
  resetTodosInHtml(todos);
}

function deleteTodo(event) {
  const todoItem = event.target.closest('.todoItem');
  const todoId = todoItem.getAttribute("data-id");
  let todos = loadTodos();
  todos.todosList = todos.todosList.filter(todo => todo.id != todoId);
  refreshTodos(todos);
  resetTodosInHtml(todos);
}

function editTodo(event) {
  const todoItem = event.target.closest('.todoItem');
  const todoId = todoItem.getAttribute("data-id");
  const textDiv = todoItem.querySelector('.todoText');
  const currentText = textDiv.textContent;

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.value = currentText;
  inputField.classList.add('editInput');

  textDiv.textContent = '';
  textDiv.appendChild(inputField);
  inputField.focus();

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.classList.add('saveBtn');
  todoItem.querySelector('.todoButtons').appendChild(saveBtn);

  todoItem.querySelectorAll('.editBtn, .deleteBtn, .completedBtn').forEach(btn => btn.style.display = 'none');

  saveBtn.addEventListener('click', () => saveEdit(todoId, inputField.value, todoItem));

  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveEdit(todoId, inputField.value, todoItem);
    }
  });
}

function saveEdit(todoId, newText, todoItem) {
  const todos = loadTodos();
  todos.todosList = todos.todosList.map(todo => 
    todo.id == todoId ? {...todo, text: newText} : todo
  );
  refreshTodos(todos);
  resetTodosInHtml(todos);
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");
  const submitButton = document.getElementById("addTodo");

  const filterBtns = document.getElementsByClassName("filterBtn");
  for (const btn of filterBtns) {
    btn.addEventListener("click", executeFilterAction);
  }

  submitButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") {
      alert("Please Write Something to add...");
    } else {
      const todos = loadTodos();
      const id = todos.todosList.length;
      const newTodo = { text: todoText, iscomplete: false, id };
      addTodosToLocalStorage(newTodo);
      addTodosInHtml(newTodo);
      todoInput.value = "";
    }
  });

  todoInput.addEventListener("input", (event) => {
    event.target.value = event.target.value.trim();
  });

  const todos = loadTodos();
  todos.todosList.forEach(addTodosInHtml);
});
