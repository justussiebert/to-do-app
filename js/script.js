const listTodos = document.querySelector("#listToDos");
const buttonAddToDo = document.querySelector("#buttonAddTodo");
const inputFieldAddToDo = document.querySelector("#inputFieldAddTodo");

const stateInit = {
  filter: "alle",
  numberToDos: 0,
};

const toDos = [
  { todoText: "nummer eins", done: false },
  { todoText: "nummer zwei", done: false },
  { todoText: "Noch eine Todo", done: true },
];

function addTodo() {
  const ff = "";
}
function updateTodo() {}

//function removeTodo() {}

function renderListTodos(filter) {
  for (let i = 0; i < toDos.length; i++) {
    console.log("Text: " + toDos[i].todoText + "Done: " + toDos[i].done);
    let textDone = " checked";
    if (!toDos[i].done === true) {
      textDone = "";
    }
    let newContainerTodo = document.createElement("li");
    //let newContentTodo = document.createTextNode(toDos[i].todoText);
    newContainerTodo.innerHTML =
      '<input type="checkbox" id="todo-' +
      i +
      '" ' +
      textDone +
      ' /><label for="todo-' +
      i +
      '">' +
      toDos[i].todoText +
      "</label>";
    //let newContentTodo = document.createTextNode("hhh");
    //newContainerTodo.appendChild(newContentTodo);

    //let currentDiv = document.getElementById("listToDos");
    //document.body.insertBefore(newContainerTodo, listTodos);
    //document.getElementById("listToDos").appendChild(newContainerTodo);
    listTodos.appendChild(newContainerTodo);
  }
}

buttonAddToDo.addEventListener("click", function (e) {
  addTodo();
});

window.onload = function () {
  //alert("ccc");
  renderListTodos();
};
