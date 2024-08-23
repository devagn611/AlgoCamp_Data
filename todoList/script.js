function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || { todosList: [] };
  //console.log(todos);
  return todos;
}

function addTodosToLocalStorage(todo) {
  const todos = loadTodos();
  todos.todosList.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodosInHtml(todo) {
  const todoList = document.getElementById("todoList");
  const todoItem = document.createElement("li");
  const textDiv = document.createElement("div");

  textDiv.textContent = todo.text;
  todoItem.classList.add("todoItem");

  const wrapper = document.createElement("div");
  wrapper.classList.add("todoButtons");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");

  const completedBtn = document.createElement("button");
  completedBtn.textContent = "Completed";
  completedBtn.classList.add("completedBtn");

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
  
  // Clear the list before applying any filter
  todoList.innerHTML = "";

  if (value === "all") {
    todos.todosList.forEach((todo) => {
      addTodosInHtml(todo);
    });
  } else if (value === "pending") {
    todos.todosList.forEach((todo) => {
      if (todo.iscomplete === false) {
        addTodosInHtml(todo);
      }
    });
  } else {
    todos.todosList.forEach((todo) => {
      if (todo.iscomplete === true) {
        addTodosInHtml(todo);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");
  const submitButton = document.getElementById("addTodo");
  const todoList = document.getElementById("todoList");

  const filterBtns = document.getElementsByClassName("filterBtn");
  for (const btn of filterBtns) {
    btn.addEventListener("click", executeFilterAction);
  }
  submitButton.addEventListener("click", (event) => {
    const todoText = todoInput.value;
    if (todoText == "") {
      alert("Please Write Something to add...");
    } else {
      addTodosToLocalStorage({ text: todoText, iscomplete: false });
      addTodosInHtml({ text: todoText, iscomplete: false });
      todoInput.value = "";
    }
  });

  todoInput.addEventListener("change", (event) => {
    const todoText = event.target.value;
    event.target.value = todoText.trim();
    console.log(event.target.value);
  });
  const todos = loadTodos();
  todos.todosList.forEach((todo) => {
    // const newTodoItem = document.createElement("li");
    // newTodoItem.textContent = todo;
    // todoList.appendChild(newTodoItem);
    addTodosInHtml(todo);
  });
});
