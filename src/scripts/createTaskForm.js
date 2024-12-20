
export const createTaskForm = (CreateLocation, isCreated) => {
    if(isCreated) return
    

    let form = document.createElement("form")
    let titlePrompt = document.createElement("div")
    let taskTitle = document.createElement("input")
    let descriptionPrompt = document.createElement("div")
    let taskDescription = document.createElement("input")
    
    form.setAttribute("id", "taskForm")
    form.classList.add("task")
    
    titlePrompt.classList.add("prompt")
    taskTitle.classList.add("textbox")
    taskTitle.setAttribute("type", "text")
    
    descriptionPrompt.classList.add("prompt")
    taskTitle.classList.add("textbox")
    taskDescription.setAttribute("type", "text")

    titlePrompt.innerText = "Title of your Task:"
    descriptionPrompt.innerText = "Description:"

    form.appendChild(titlePrompt)
    form.appendChild(taskTitle)
    form.appendChild(descriptionPrompt)
    form.appendChild(taskDescription)
    CreateLocation.appendChild(form)
    taskTitle.focus()

    form.addEventListener("click", (e) => {
        saveForm()
    }, {once:true})
    
}

export const saveNewTask = (tasks) => {
    let thisForm = document.getElementById("submitForm")
    let task = {}
    
    const formTitle = thisForm.querySelector(".formTitle")
    const formDescrip = thisForm.querySelector(".taskDescription")

    task.description = formDescrip.value
    task.name = formTitle.value
    task.hours = 0

    // TODO move this to backend after i've made a fetch req
    let now = Date.now()
    let timestamp = `${now.getMonth()}-${now.getFullYear()}`
    task.creationDate = timestamp

    tasks.push(task)
    console.log("Tasks saved. Tasks:")
    console.log(tasks)
    // collapseForm(thisForm)// TODO collapsing this should use a separate function for collapsing the new task
    // TODO Add a new collapsed task for the new task
    
    
}

export const saveNewLog = (newLogs, taskID) => {
    let submitForm = document.getElementById("submitForm")
    let newHours = document.getElementById("newHours")
    newLogs.push(newHours.value)
}


// used to initialize page for each task
export const createCollapsedTask = (tasks, task, CreateLocation) => {
    let newTask = document.createElement("div")
    newTask.classList.add("collapsed")
    newTask.setAttribute("id", `task-${task.id}`)

    let newTitle = document.createElement("div")
    newTitle.innerText = task.name
    newTitle.classList.add("taskTitle")

    newTask.appendChild(newTitle)
    CreateLocation.appendChild(newTask)

    newTask.addEventListener("click", () => {
        console.log("LLLLL")
        console.log(newTask)
        expandForm(newTask, tasks)
    }, {once : true})
}

export const expandForm = (task, tasks) => {
    console.log(task)
    task.classList.toggle("collapsed")
    task.classList.toggle("uncollapsed")

    let container = document.createElement("div")
    let taskDescription = document.createElement("div")
    let formLogs = document.createElement("div")
    let logTitle = document.createElement("div")

    container.setAttribute("id", "formContainer")
    container.classList.add("container")
    formLogs.classList.add("formLogs")
    logTitle.classList.add("logTitle")
    taskDescription.classList.add("taskDescription")

    // to find position of the clicked task within tasks, we must first get the HTML element's id. However, the uuid's
    // in mongo start with 1, not 0, so we need to offset by 1 to find the proper id in the tasks array
    let taskID = task.id.split("-")[1] - 1
    console.log(task.id)

    taskDescription.innerText = tasks[taskID].description
    container.appendChild(taskDescription)

    logTitle.innerText = "Contributor: hoursContributed"
    container.appendChild(logTitle)
    task.appendChild(container)

    const createLogs = (number, Hours, PlacementLocation) => {
        let log = document.createElement("div")
        log.setAttribute("id", `log-${number}`)
        log.classList.add("log")

        let content = document.createElement("div")
        content.innerText = `{ Contributor ${Hours.contributor} logged ${Hours.hours} hours }`

        log.appendChild(content)
        PlacementLocation.appendChild(log)
        
    }
    console.log(tasks)
    console.log(taskID)
    // only loop through logs if logs have been submitted
    if(tasks[taskID].hours.length > 0){
        for(let i = 0; i < tasks[taskID].hours.length; i++){
            createLogs(i, tasks[taskID].hours[i], formLogs)
        }
    }
    
    
    container.appendChild(formLogs)
    let newForm = document.createElement("form")
    let newTitle = document.createElement("div")
    let newInput = document.createElement("input")

    newInput.setAttribute("type", "text")
    newInput.setAttribute("id", "newHours")
    newForm.setAttribute("id", "submitForm")
    newTitle.innerText = "Time(in hours):"
    newForm.appendChild(newTitle)
    newForm.appendChild(newInput)
    container.appendChild(newForm)
    newInput.focus()
    console.log("Expanding form")
    console.log(container)
    console.log(newForm)

    newForm.addEventListener("submit", (e) => {
        e.preventDefault();
        saveNewLog(tasks, taskID) // <-- will get new parameters as time goes on to save new elements
        collapseTask(container, tasks)
        //fetchUpdate();
        //if fetch success, redirect()
    }, {once:true})
}

export const collapseTask = (taskContainer, tasks) => { // TODO collapse form should also remove the form from the DOM

    while(taskContainer.firstChild){
        taskContainer.removeChild(taskContainer.firstChild)
    }
    let parent = taskContainer.parentElement
    parent.classList.toggle("uncollapsed")
    parent.classList.toggle("collapsed")
    parent.removeChild(taskContainer)

    let tasklist = document.getElementById("tasklist")
    tasklist.addEventListener("click", () => {
        expandForm(newTask, tasks)
    }, {once : true})
}

export const fetchToSave = (tasks, techs, description, projname) => {

}