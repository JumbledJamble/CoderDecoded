export const createTask = (tasklist, taskText, currentTasks) => {

    if(!taskText){
        console.log("Invalid input.")
    }

    let task = document.createElement("div")
    task.innerText = `-  ${taskText}`

    currentTasks.push(`-  ${taskText}`)
    task.classList.add("taskItem")
    task.addEventListener("click", () => {
        console.log("Event listener triggered. Removing task")
        console.log(task)
        removeTask(tasklist, task, currentTasks)
    })

    tasklist.appendChild(task)
}

export const removeTask = (tasklist, taskToRemove, currentTasks) => {

    currentTasks.splice(currentTasks.indexOf(taskToRemove.innerText))
    tasklist.removeChild(taskToRemove)
    console.log("Task was removed")
    console.log(currentTasks)
}