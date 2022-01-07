const listTodos = document.querySelector("#listToDos");
const buttonRemoveToDo = document.querySelector("#buttonDeleteDoneTodos");
const buttonAddToDo = document.querySelector("#buttonAddTodo");
const inputFieldAddToDo = document.querySelector("#inputFieldAddTodo");
//const radioChangeFilter = document.querySelector('[name="filter"]:checked').value;
let radioFilter = document.querySelectorAll('input[name="filter"]');

const stateInit = {
  filter: "alle",
  numberToDos: 0,
};
/*
const toDos = [
  { todoText: "nummer eins", done: false },
  { todoText: "nummer zwei", done: false },
  { todoText: "Noch eine Todo", done: true },
];
*/
let toDos = [];

function addTodo() {
  //alert("Neue Todo: " + inputFieldAddToDo.value);
  if (inputFieldAddToDo.value.length > 4) {
    let objectToPush = {
      todoText: inputFieldAddToDo.value,
      done: false,
    };
    toDos.push(objectToPush);
    renderListTodos(stateInit.filter);
    inputFieldAddToDo.value = "";
  } else {
    alert("Die Todo sollte schon aus min. 5 Zeichen bestehen...");
  }
}

function updateFilter(filter) {
  stateInit.filter = filter;

  renderListTodos(filter);
  //console.log("Filter aktuell: " + stateInit.filter);
}

function updateTodo() {
  const listItems = listTodos.getElementsByTagName("li");
  //const listItems = listTodos.getElementsByTagName("input");
  //alert(listItems.length);
  for (let i = 0; i < listItems.length; i++) {
    let checkBox = document.getElementById("todo-" + i);

    //checkBox.addEventListener("change", function (e) {
    checkBox.addEventListener("change", function (e) {
      //alert(checkBox.id);
      let isDone = true;
      if (checkBox.checked === true) {
        //alert("Item: checked");
      } else {
        //alert("nicht checked");
        isDone = false;
      }
      toDos[i].done = isDone;
    });
    /*
    
*/
    //alert(listItems[i].value);
  }
}

listTodos.addEventListener("input", function (e) {
  //alert("geklickt");
  updateTodo();
  renderListTodos(stateInit.filter);
});

let cleanedToDoList = [];

function removeTodo(filterKey, filterValue) {
  //let toDosToBeRemovedTmp = [];
  for (let i = 0; i < toDos.length; i++) {
    //if (toDos[i].filterKey === toDos[i].filterValue) {
    if (toDos[i].done === true) {
      //toDos[i] = "";
      //delete toDos[i];
    }
    //alert("Key: " + toDos[i].done);
  }
  cleanedToDoList = toDos.filter((isDoneOrNot) => isDoneOrNot.done === false);
  toDos = cleanedToDoList;
  //toDos = [];
  console.log("Bereinigte: " + cleanedToDoList);
  console.log("neue Liste: " + toDos);
}

buttonRemoveToDo.addEventListener("click", function (e) {
  removeTodo("done", "true");
  renderListTodos(stateInit.filter);
});

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
  /*
  const checkboxesOfListTodos = document.querySelectorAll(
    "#listToDos > li > input[type=checkbox]"
  );
  alert(checkboxesOfListTodos.length);
  */
};
/*
function initAll() {
  //alert("h");
  //initAll(), setTimeout(1000);
}
initAll(), setTimeout(100);
*/
