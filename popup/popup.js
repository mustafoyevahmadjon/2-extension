const addTaskBtn = document.getElementById("add_task_btn")
let tasks = [];
const startBtn = document.getElementById("start_btn")
startBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (result) => {
        chrome.storage.local.set({
            isRunning: !result.isRunning
        }, () => {
            startBtn.textContent = !result.isRunning ? "Pause Timer" : "Start Timer"
        })
    })
})

addTaskBtn.addEventListener("click", () => addTask())
chrome.storage.sync.get(["tasks"], (result) => {
    tasks = result.tasks ? result.tasks : []
    renderTasks()
})

function saveTasks () {
    chrome.storage.sync.set({tasks})
}

function renderTask(taskNum) {
    const taskRow = document.createElement("div")
    const text = document.createElement("input")
    text.type = "text";
    text.placeholder = "Enter a task ..."
    text.value = tasks[taskNum];
    text.addEventListener("change", () => {
        tasks[taskNum] = text.value
        saveTasks()
    })

    const deleteBtn = document.createElement("input")
    deleteBtn.type = "button"
    deleteBtn.value = "X";
    deleteBtn.addEventListener("click", () => {
        deleteTask(taskNum)
    })

    taskRow.appendChild(text)
    taskRow.appendChild(deleteBtn)
    const taskContainer = document.getElementById("task-container")
    taskContainer.appendChild(taskRow)
}

function addTask() {
    const taskNum = tasks.length
    tasks.push("")
    renderTask(taskNum)
    saveTasks()
}

function deleteTask(taskNum) {
    tasks.splice(taskNum, 1)
    renderTasks()
    saveTasks()
}

function renderTasks() {
    const taskContainer = document.getElementById("task-container")
    taskContainer.textContent= "";
    tasks.forEach((taskText, taskNum) => {
        renderTask(taskNum)
    })
}