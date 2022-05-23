//globals
const themeProviderBtn = document.getElementById("themeProvider");
const body = document.querySelector("body");
const header = document.querySelector("header");
const toDoLists = document.getElementById("toDoLists");
const todoListBracket = document.getElementById("odoListBracket");

//variable for inputs
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

    // let old_todo = JSON.parse(localStorage.getItem("data"));
    // old_todo.push(NEW_TODO_VALUE);

    // localStorage.setItem("data", JSON.stringify(old_todo));
    // inputNewToDo.value = "";

    // updateNewTodo();
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

        inputNewToDo.onclick = () => {
          warningText.innerHTML = "";
        };

        inputNewToDo.onkeydown = () => {
          warningText.innerHTML = "";
        };
      });
  }
}

function filterStorage(data) {
  return data === inputNewToDo.value.toLowerCase();
}

function updateNewTodo() {
  let LOCAL_STORAGE = JSON.parse(localStorage.getItem("data"));
  loopTheList(LOCAL_STORAGE);
}

function deleteItem(thisElement) {
  LOCAL_STORAGE = JSON.parse(localStorage.getItem("data"));
  let indexElement = thisElement.parentElement.childNodes[3].innerHTML;
  console.log(LOCAL_STORAGE.indexOf(indexElement));
  LOCAL_STORAGE.splice(LOCAL_STORAGE.indexOf(indexElement), 1);
  localStorage.setItem("data", JSON.stringify(LOCAL_STORAGE));

  updateNewTodo();
}

function checkToDoItemComplete(thisElement) {
  LOCAL_STORAGE = JSON.parse(localStorage.getItem("data"));
  let indexElement = thisElement.parentElement.childNodes[3].innerHTML;
  let checkBtnElement = thisElement.parentElement.childNodes[1];

  let indexValue = LOCAL_STORAGE.indexOf(indexElement);

  if (checkBtnElement.dataset.check === "incomplete") {
    completedToDo(indexValue);
    checkBtnElement.setAttribute("data-check", "completed");
  } else {
    console.log("incomplete");
    checkBtnElement.setAttribute("data-check", "incomplete");
  }
}

function completedToDo(index) {
  console.log(index);
}

/*HTML EXECUTION TEMPLATE */
function loopTheList(element) {
  let toDoCounter = element.length;
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
  <div class="to-do-filter-clear-completed item-filter">
    Clear Completed
  </div>
</div>
</div>`;
  htmlElement += "</div>";
  toDoLists.innerHTML = htmlElement;
}
