let todoList = []
const ul = document.getElementById("todoList");

function fetchList() {
  
  removeListChild()
  
  if (todoList.length < 1) {
    const li = document.createElement("li");
    li.textContent = "No Data";
    ul.appendChild(li);
    return;
  }

  todoList.forEach((item, index) => {
    const li = document.createElement("li")

    appendChildList(li, item, index)

    ul.appendChild(li)
  })
  
  document.getElementById('data-length').innerText  = todoList.filter(data => !data.done).length
}

function addTask() {
  const el = document.getElementById('input-todo')
  const task = el.value

  if (!task) return alert('fill the task')

  const newTask = { task, done: false }

  if (todoList.length === 0) removeListChild()

  todoList.push(newTask)

  el.value = ''

  fetchList()
}

function deleteAllTask() {
  todoList = []
  removeListChild()

  fetchList()
}

function finishAllTask() {
  if (todoList.length < 1) return alert('no todo list')

  todoList = todoList.map((data) => {
    return {...data, done: true}
  })

  const allDone = todoList.every((task) => task.done);
  
  fetchList()

  if (allDone) {
    alert("All tasks are done, good job!");
  }
}

function appendChildList(li, item, index) {

  if (!li || !item || index < 0) return alert('please provide element, item and index')

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.done;

  checkbox.addEventListener("change", () => {
    todoList[index].done = checkbox.checked;
    fetchList();
  });

  const taskText = document.createElement("span");
  taskText.textContent = item.task;
  taskText.style.padding = "0 10px";

  if (item.done) {
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "gray";
  }

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", () => {
    todoList.splice(index, 1);
    fetchList();
  });

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(removeButton);
}

function removeListChild() {
  ul.innerHTML = ''
}

fetchList()