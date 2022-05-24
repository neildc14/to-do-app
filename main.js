//globals
const themeProviderBtn = document.getElementById("themeProvider");
const body = document.querySelector("body");
const header = document.querySelector("header");
const toDoLists = document.getElementById("toDoLists");
const todoListBracket = document.getElementById("todoListBracket");
const inputNewToDo = document.getElementById("inputNewToDo");

/*themprovider */
themeProviderBtn.addEventListener("click", themeProviderFunc);

function themeProviderFunc() {
  if (body.dataset["theme"] === "darkTheme") {
    themeProviderBtn.setAttribute("src", "images/icon-sun.svg");
    body.setAttribute("data-theme", "lightTheme");
  } else {
    themeProviderBtn.setAttribute("src", "images/icon-moon.svg");
    body.setAttribute("data-theme", "darkTheme");
  }
}

/*input to add to do list */
inputNewToDo.addEventListener("keypress", addNewToDo);

function addNewToDo(event) {
  if (inputNewToDo.value !== "" && event.key === "Enter") {
    let NEW_TODO_VALUE = inputNewToDo.value.toLowerCase();

    if (localStorage.getItem("data") == null) {
      localStorage.setItem("data", "[]");
    }

    const inputFilter = JSON.parse(localStorage.getItem("data"));
    let inputSomeResult = inputFilter.some(filterStorage);

    let inputValidation = new Promise((resolve, reject) => {
      let someValue = false;

      if (inputSomeResult === someValue) {
        resolve("Validated");
      } else {
        reject("This to-do is already declared.");
      }
    });

    inputValidation
      .then(() => {
        let old_todo = JSON.parse(localStorage.getItem("data"));
        old_todo.push(NEW_TODO_VALUE);

        localStorage.setItem("data", JSON.stringify(old_todo));
        inputNewToDo.value = "";

        updateNewTodo();
      })
      .catch((error) => {
        warningText.innerHTML += error;

        ErrorReactionHandler();
      });
  }
}

function filterStorage(data) {
  return data === inputNewToDo.value.toLowerCase();
}

function ErrorReactionHandler() {
  inputNewToDo.onclick = () => {
    return (warningText.innerHTML = "");
  };

  inputNewToDo.onkeydown = () => {
    return (warningText.innerHTML = "");
  };
  inputNewToDo.onmouseout = () => {
    return (warningText.innerHTML = "");
  };

  body.onscroll = () => {
    return (warningText.innerHTML = "");
  };
}

function updateNewTodo() {
  let LOCAL_STORAGE = JSON.parse(localStorage.getItem("data"));
  let COMPLETED_TODO = JSON.parse(localStorage.getItem("completedToDos"));
  loopTheList(LOCAL_STORAGE, COMPLETED_TODO);
}

function deleteItem(thisElement) {
  LOCAL_STORAGE = JSON.parse(localStorage.getItem("data"));
  let COMPLETED_TODO = JSON.parse(localStorage.getItem("completedToDos"));

  let indexElement = thisElement.parentElement.childNodes[3].innerHTML;

  LOCAL_STORAGE.splice(LOCAL_STORAGE.indexOf(indexElement), 1);

  if (localStorage.getItem("completedToDos") == null) {
    localStorage.setItem("completedToDos", "[]");
  }

  if (COMPLETED_TODO.includes(indexElement)) {
    COMPLETED_TODO.splice(COMPLETED_TODO.indexOf(indexElement), 1);
    localStorage.setItem("completedToDos", JSON.stringify(COMPLETED_TODO));
  }
  localStorage.setItem("data", JSON.stringify(LOCAL_STORAGE));

  updateNewTodo();
  console.log(JSON.parse(localStorage.getItem("completedToDos")));
}

function checkToDoItemComplete(thisElement) {
  LOCAL_STORAGE = JSON.parse(localStorage.getItem("data"));
  let indexElement = thisElement.parentElement.childNodes[3].innerHTML;
  let textAttribute = thisElement.parentElement.childNodes[3];
  let checkBtnElement = thisElement.parentElement.childNodes[1];

  if (checkBtnElement.dataset.check === "incomplete") {
    textAttribute.style.cssText =
      "text-decoration: line-through; color: hsl(236, 9%, 61%)";
    checkBtnElement.setAttribute("data-check", "completed");

    completedToDo(indexElement);
  } else {
    checkBtnElement.setAttribute("data-check", "incomplete");
    textAttribute.style.cssText = "text-decoration: none;";

    let COMPLETED_TODO = JSON.parse(localStorage.getItem("completedToDos"));
    COMPLETED_TODO.splice(COMPLETED_TODO.indexOf(indexElement), 1);
    localStorage.setItem("completedToDos", JSON.stringify(COMPLETED_TODO));

    updateNewTodo();
  }
}

function completedToDo(index) {
  if (localStorage.getItem("completedToDos") == null) {
    localStorage.setItem("completedToDos", "[]");
  }

  let indexofList = index.toString();
  console.log(indexofList);

  let COMPLETED_TODO = JSON.parse(localStorage.getItem("completedToDos"));

  if (!COMPLETED_TODO.includes(indexofList)) {
    COMPLETED_TODO.push(indexofList);

    localStorage.setItem("completedToDos", JSON.stringify(COMPLETED_TODO));
    console.log(JSON.parse(localStorage.getItem("completedToDos")));

    updateNewTodo();
  }
}

function clearCompleted() {
  LOCAL_STORAGE = JSON.parse(localStorage.getItem("data"));
  COMPLETED_TODO = JSON.parse(localStorage.getItem("completedToDos"));

  COMPLETED_TODO.forEach((val) => {
    LOCAL_STORAGE.splice(LOCAL_STORAGE.indexOf(val), 1);
    localStorage.setItem("data", JSON.stringify(LOCAL_STORAGE));
    LOCAL_STORAGE;
    localStorage.removeItem("completedToDos");
    updateNewTodo();
  });
}

/*HTML EXECUTION TEMPLATE */
function loopTheList(element, completed) {
  let toDoCounter;
  if (completed !== null) {
    toDoCounter = element.length - completed.length;
  } else {
    toDoCounter = element.length;
  }

  let htmlElement = "<div>";
  for (let i = 0; i < element.length; i++) {
    htmlElement += `<div class="to-do-list" id="todoListBracket">
  <div class="checkbox-container" data-check="incomplete" 
  onclick="checkToDoItemComplete(this)">
    <div class="checkbox">
      <img
        src="images/icon-check.svg"
        alt="checkbox button"
        id="checkboxBtn"
      />
    </div>
  </div>
  <div class="to-do-text" data-check="incomplete">${element[i]}</div>
  <div class="close-button-container closeBtn" data-active="false" 
  onclick="deleteItem(this)">
    <div class="close-button">
      <img src="images/icon-cross.svg" alt="close button" />
    </div>
  </div>
</div>
`;
  }
  htmlElement += `<div class="to-do-lists-filters">
  <p class="to-do-items-left m-0 item-filter">${toDoCounter} items left</p>
  <div class="to-do-filter-options-desktop">
    <div class="to-do-filter-all filter">All</div>
    <div class="to-do-filter-active filter">Active</div>
    <div class="to-do-filter-all filter">Completed</div>
  </div>
  <div class="to-do-filter-clear-completed item-filter" onclick="clearCompleted()">
    Clear Completed
  </div>
</div>
</div>`;
  htmlElement += "</div>";
  toDoLists.innerHTML = htmlElement;
}
