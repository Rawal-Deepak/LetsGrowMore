var todo = {
  data : [], // todo list data array
  hadd : null, // html add item text field
  templete : null, // html item row template
  List_el : null, // html to do list
  initial : () => {
        if (localStorage.todo == undefined) { localStorage.todo = "[]"; }
    todo.data = JSON.parse(localStorage.todo);
    todo.hadd = document.getElementById("todo-item");
    todo.templete = document.getElementById("todo-template").content;
    todo.List_el = document.getElementById("todo-list");
    document.getElementById("todo-add").onsubmit = todo.add;
    todo.draw();
  },
  draw : () => {
    todo.List_el.innerHTML = "";
    if (todo.data.length>0) { for (let id in todo.data) {
      let row = todo.templete.cloneNode(true);
      row.querySelector(".todo-item").textContent = todo.data[id][0];
      row.querySelector(".todo-done").onclick = () => { todo.toggle(id); };
      row.querySelector(".todo-del").onclick = () => { todo.del(id); };
      if (todo.data[id][1]) {
        row.querySelector(".todo-item").classList.add("todo-ok");
      }
      todo.List_el.appendChild(row);
    }}
  },
  save: () => {
    localStorage.todo = JSON.stringify(todo.data);
    todo.draw();
  },
  add : () => {
    todo.data.push([todo.hadd.value, false]);
    todo.hadd.value = "";
    todo.save();
    return false;
  },
  toggle: (id) => {
    todo.data[id][1] = !todo.data[id][1];
    todo.save();
  },
  del: (id) => { if (confirm("Delete task?")) {
    todo.data.splice(id, 1);
    todo.save();
  }}
};
window.addEventListener("load", todo.initial);
