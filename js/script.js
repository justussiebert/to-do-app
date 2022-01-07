const listTodos = document.querySelector("#listToDos");
const buttonRemoveToDo = document.querySelector("#buttonDeleteDoneTodos");
const buttonAddToDo = document.querySelector("#buttonAddTodo");
const inputFieldAddToDo = document.querySelector("#inputFieldAddTodo");
let radioFilter = document.querySelectorAll('input[name="filter"]');

let cleanedToDoList = [];
let filteredToDoList;

const stateInit = {
  filter: "alle",
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
}

function updateTodo() {
  const listItems = listTodos.getElementsByTagName("li");
  for (let i = 0; i < listItems.length; i++) {
    let checkBox = document.getElementById("todo-" + i);
    checkBox.addEventListener("change", function (e) {
      let isDone = true;
      if (checkBox.checked !== true) {
        isDone = false;
      }
      toDos[i].done = isDone;
    });
  }
}

// wenn in der Liste was (checkbox) geklickt wird, also done-status augedated wird...
listTodos.addEventListener("input", function (e) {
  updateTodo();
  renderListTodos(stateInit.filter);
});

function removeTodo() {
  cleanedToDoList = toDos.filter((isDoneOrNot) => isDoneOrNot.done === false);
  toDos = cleanedToDoList;
}

buttonRemoveToDo.addEventListener("click", function (e) {
  removeTodo();
  renderListTodos(stateInit.filter);
});

// render fresh todo-list in dom
function renderListTodos(filter) {
  listTodos.innerHTML = "";
  let filterIsDone = false;

  if (filter === "alle") {
    filteredToDoList = toDos;
  } else {
    if (filter === "erledigt") {
      filterIsDone = true;
    }

    filteredToDoList = toDos.filter(
      (isDoneOrNot) => isDoneOrNot.done === filterIsDone
    );
  }

  for (let i = 0; i < filteredToDoList.length; i++) {
    let textDone = " checked";
    if (!filteredToDoList[i].done === true) {
      textDone = "";
    }
    let newContainerTodo = document.createElement("li");
    newContainerTodo.innerHTML =
      '<input type="checkbox" id="todo-' +
      i +
      '" ' +
      textDone +
      ' /><label for="todo-' +
      i +
      '">' +
      filteredToDoList[i].todoText +
      "</label>";
    listTodos.appendChild(newContainerTodo);
  }
}

buttonAddToDo.addEventListener("click", function (e) {
  addTodo();
});

// den Filter (radio-buttons) im dom durchgehen, wenn da geklickt wird, state aktualisieren
for (let i = 0; i < radioFilter.length; i++) {
  radioFilter[i].addEventListener("change", function () {
    let val = this.value; // this == the clicked radio,
    updateFilter(val);
  });
}

// bei start der Seite: alles frisch aus state holen, also im dom den filter (radio) checken, der laut state gecheckt sein soll
function initState() {
  for (let i = 0; i < radioFilter.length; i++) {
    if (stateInit.filter === radioFilter[i].value) {
      radioFilter[i].checked = true;
    }
  }
}

// bei Laden der Seite: frischen state holen (welcher filter status gesetzt sein soll, radio)
// Liste wird auch neu gerendert, gibt allerdings anfangs keine, könnte aber ja sein, wenn man was in den state bw. todo-array rein schreibt
window.onload = function () {
  initState();
  renderListTodos(stateInit.filter);
};
