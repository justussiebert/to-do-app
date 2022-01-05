const listTodos = document.querySelector("#listToDos");
const buttonAddToDo = document.querySelector("#buttonAddTodo");
const inputFieldAddToDo = document.querySelector("#inputFieldAddTodo");
//const radioChangeFilter = document.querySelector('[name="filter"]:checked').value;
let radioFilter = document.querySelectorAll('input[name="filter"]');

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

function updateFilter(filter) {
  stateInit.filter = filter;

  renderListTodos(filter);
  //console.log("Filter aktuell: " + stateInit.filter);
}

function updateTodo() {}

//function removeTodo() {}

let filteredToDoList;

function renderListTodos(filter) {
  let filterIsDone = false;
  if (filter === "alle") {
    filteredToDoList = toDos;
  } else {
    if (filter === "erledigt") {
      filterIsDone = true;
    }
    //alert("Filter: " + filter);
    filteredToDoList = toDos.filter(
      (isDoneOrNot) => isDoneOrNot.done === filterIsDone
    );
  }

  listTodos.innerHTML = "";

  //for (let i = 0; i < toDos.length; i++) {
  for (let i = 0; i < filteredToDoList.length; i++) {
    //console.log("Text: " + toDos[i].todoText + "Done: " + toDos[i].done);
    let textDone = " checked";
    //if (!toDos[i].done === true) {
    if (!filteredToDoList[i].done === true) {
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
      //toDos[i].todoText +
      filteredToDoList[i].todoText +
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

for (let i = 0; i < radioFilter.length; i++) {
  radioFilter[i].addEventListener("change", function () {
    let val = this.value; // this == the clicked radio,
    //console.log("Wert: " + val);
    updateFilter(val);
  });
}
/*
radioChangeFilter.addEventListener("change", function (e) {
  updateFilter();
});
*/

function initState() {
  for (let i = 0; i < radioFilter.length; i++) {
    if (stateInit.filter === radioFilter[i].value) {
      radioFilter[i].checked = true;
      //alert("Filter: " + stateInit.filter);
      //stateInit.filter = radioFilter[i].value;
    }
  }
}

window.onload = function () {
  //alert("ccc");
  initState();
  renderListTodos(stateInit.filter);
};
