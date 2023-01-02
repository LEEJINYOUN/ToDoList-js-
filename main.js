const taskInput = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
const taskBoard = document.querySelector(".taskBoard");
let taskList = [];
const tabs = document.querySelectorAll(".taskTabs div");
let mode = "all";
let filterList = [];
// const underLine = document.querySelector("#underLine");
const all = document.querySelector("#all");
const onGoing = document.querySelector("#ongoing");
const done = document.querySelector("#done");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    addTask(e);
  }
});

function addTask() {
  let task = {
    id: randomId(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  if (taskInput.value != "") {
    taskList.push(task);
    taskInput.value = "";
    taskInput.focus();
    render();
  }
}

function randomId() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
        <div class="task">
        <div class="taskTitle">
          <div class="title taskDone" >${list[i].taskContent}</div>
        </div>
        <div class="taskBtns">
          <button class="checkBtn" onClick="toggleComplete('${list[i].id}')">
          <i class="fa-sharp fa-solid fa-rotate-right rotate"></i>
          </button>
          <button class="removeBtn" onClick="deleteTask('${list[i].id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
    } else {
      resultHTML += `
        <div class="task">
        <div class="taskTitle">
          <div class="title">${list[i].taskContent}</div>
        </div>
        <div class="taskBtns">
          <button class="checkBtn" onClick="toggleComplete('${list[i].id}')">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="removeBtn" onClick="deleteTask('${list[i].id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
    }
  }
  taskBoard.innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (e) {
    filter(e);
  });
}

function filter(e) {
  if (e) {
    mode = e.target.id;
    if (mode == "all") {
      all.classList.add("taskClick");
      onGoing.classList.remove("taskClick");
      done.classList.remove("taskClick");
    } else if (mode == "ongoing") {
      all.classList.remove("taskClick");
      onGoing.classList.add("taskClick");
      done.classList.remove("taskClick");
    } else if (mode == "done") {
      all.classList.remove("taskClick");
      onGoing.classList.remove("taskClick");
      done.classList.add("taskClick");
    }
  }

  filterList = [];
  if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}
