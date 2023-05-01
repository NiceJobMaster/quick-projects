const input = document.getElementById("input");
const todosEl = document.getElementById("todos");
const todosArray = localStorage.todos ? JSON.parse(localStorage.todos) : [];

const generateTodo = (id, value, done) => {
  const classDone = done ? "done" : "";
  return `<div id="${id}" class="todo ${classDone}"><span onclick="doneTodo(${id})">${value}</span><i onclick="removeTodo(${id})" class="material-icons">close</i></div>`;
};

const updateTodos = () => {
  todosEl.innerHTML = "";
  todosArray.forEach((el) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = el.html;
    todosEl.appendChild(tmp.children[0]);
  });
  saveTodos();
};

const doneTodo = (id) => {
  const index = todosArray.findIndex((e) => e.id == id);
  const todo = todosArray[index];
  todo.done = !todo.done;
  todo.html = generateTodo(id, todo.value, todo.done);
  updateTodos();
};

const removeTodo = (id) => {
  const index = todosArray.findIndex((e) => e.id == id);
  todosArray.splice(index, 1);
  updateTodos();
};

const saveTodos = () => {
  localStorage.todos = JSON.stringify(todosArray);
};

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && input.value) {
    event.preventDefault();
    const id = todosArray.length > 0 ? todosArray[0].id + 1 : 1;
    todosArray.unshift({
      id,
      done: false,
      value: input.value,
      html: generateTodo(id, input.value, false),
    });
    input.value = null;
    updateTodos();
  }
});

updateTodos();