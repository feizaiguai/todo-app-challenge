let todos = JSON.parse(localStorage.getItem("todos") || "[]");
let filter = "all";

function render() {
  const list = document.getElementById("todoList");
  const filtered = todos.filter(t =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  );
  list.innerHTML = filtered.map((t, i) => `
    <li class="${t.done ? 'completed' : ''}" data-id="${t.id}">
      <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggle(${t.id})">
      <span>${escapeHtml(t.text)}</span>
      <button class="delete" onclick="remove(${t.id})">✕</button>
    </li>
  `).join("");
  document.getElementById("counter").textContent =
    `${todos.filter(t => !t.done).length} items left`;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  input.value = "";
  render();
}

function toggle(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
  render();
}

function remove(id) {
  todos = todos.filter(t => t.id !== id);
  render();
}

function filterTodos(f, btn) {
  filter = f;
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.done);
  render();
}

function escapeHtml(t) {
  return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

document.getElementById("todoInput").addEventListener("keypress", e => {
  if (e.key === "Enter") addTodo();
});

render();