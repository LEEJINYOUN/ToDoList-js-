let taskInput = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
let taskList = [];
const tabs = document.querySelectorAll(".taskTabs div");
let mode = "all";
let filterList = [];

addBtn.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (e) {
    filter(e);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  if (taskInput.value != "") {
    taskList.push(task);
    taskInput.value = "";
    render();
  }
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
  document.querySelector(".taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(e) {
  mode = e.target.id;
  filterList = [];

  document.querySelector("#underLine").style.width =
    e.target.offsetWidth + "px";
  document.querySelector("#underLine").style.top =
    e.target.offsetTop + e.target.offsetHeight + "px";
  document.querySelector("#underLine").style.left = e.target.offsetLeft + "px";

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
  console.log(filterList);
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
