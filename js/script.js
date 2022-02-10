const listTodos = document.querySelector("#listToDos");
const buttonRemoveToDo = document.querySelector("#buttonDeleteDoneTodos");
const buttonAddToDo = document.querySelector("#buttonAddTodo");
const inputFieldAddToDo = document.querySelector("#inputFieldAddTodo");
const radioFilter = document.querySelectorAll('input[name="filter"]');

const state = {
  filter: "alle",
  toDos: [],
};
/*
toDos = [
  { todoText: "nummer eins", done: false },
  { todoText: "nummer zwei", done: false },
  { todoText: "Noch eine Todo", done: true },
];
*/

function addTodo() {
  //alert("Neue Todo: " + inputFieldAddToDo.value);
  if (inputFieldAddToDo.value.length > 4) {
    let newToDo = {
      todoText: inputFieldAddToDo.value,
      done: false,
    };
    state.toDos.push(newToDo);
    renderListTodos(state.filter);
    inputFieldAddToDo.value = "";
  } else {
    alert("Die Todo sollte schon aus min. 5 Zeichen bestehen...");
  }
}

function updateFilter(filter) {
  state.filter = filter;
  renderListTodos(filter);
}

function updateTodo() {
  //const listItems = listTodos.getElementsByTagName("li");
  const listItems = listTodos.getElementsByTagName("input");
  for (let i = 0; i < listItems.length; i++) {
    let checkBox = document.getElementById("todo-" + i);
    checkBox.addEventListener("change", function (e) {
      let isDone = true;
      if (checkBox.checked !== true) {
        isDone = false;
      }
      console.log("State: ", state);
      //console.log("isdone: ", isDone);
      state.toDos[i].done = isDone;
      console.log("item: ", state.toDos[i]);
      renderListTodos(state.filter);
    });
  }
  //renderListTodos(state.filter);
}

// wenn in der Liste was (checkbox) geklickt wird, also done-status upgedated wird...
listTodos.addEventListener("input", function (e) {
  updateTodo();
  console.log("checkbox value: ", e.target.checked);
  //console.log(state);
  //renderListTodos(state.filter);
});

function removeTodo() {
  let cleanedToDoList = [];
  cleanedToDoList = state.toDos.filter(
    (isDoneOrNot) => isDoneOrNot.done === false
  );
  state.toDos = cleanedToDoList;
}

buttonRemoveToDo.addEventListener("click", function (e) {
  removeTodo();
  renderListTodos(state.filter);
});

// render fresh todo-list in dom
function renderListTodos() {
  const filter = state.filter;
  let filteredToDoList;
  //let filterIsDone = false;

  listTodos.innerHTML = "";

  if (filter === "alle") {
    filteredToDoList = state.toDos;
  } else if (filter === "erledigt") {
    //filterIsDone = true;
    filteredToDoList = state.toDos.filter((todo) => todo.done === true);
  } else if (filter === "nicht-erledigt") {
    //filterIsDone = false;
    filteredToDoList = state.toDos.filter((todo) => todo.done === false);
  }
  //filterIsDone = false;
  //console.log(filterIsDone);
  /*
  filteredToDoList = state.toDos.filter(
    (isDoneOrNot) => isDoneOrNot.done === filterIsDone
  );
*/
  for (let i = 0; i < filteredToDoList.length; i++) {
    let newContainerTodo = document.createElement("li");
    let textDone = " checked";
    if (!filteredToDoList[i].done === true) {
      textDone = "";
    }

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
    if (state.filter === radioFilter[i].value) {
      radioFilter[i].checked = true;
    }
  }
}

// bei Laden der Seite: frischen state holen (welcher filter status gesetzt sein soll, radio)
// Liste wird auch neu gerendert, gibt allerdings anfangs keine, könnte aber ja sein, wenn man was in den state bw. todo-array rein schreibt
window.onload = function () {
  initState();
  renderListTodos(state.filter);
};
