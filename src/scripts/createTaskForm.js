let newPath = true

// used to initialize page for each task
export const createCollapsedTask = (tasks, task, CreateLocation, changes, username) => {
    let newTask = document.createElement("div")
    newTask.classList.add("collapsed")
    newTask.setAttribute("id", `task-${task.id}`)

    let newTitle = document.createElement("div")
    newTitle.innerText = task.name
    newTitle.classList.add("taskTitle")

    newTask.appendChild(newTitle)
    CreateLocation.appendChild(newTask)

    newTask.addEventListener("click", (e) => {
        console.log("Create collapsed task event listener clicked")
        if(newPath == true){
            handleTaskClick(newTask, tasks, changes, username, e.target)
        }else{
            
            expandForm(newTask, tasks, changes, username)
        }
    }, {once : true})
}

export const saveNewTask = (changes, currentTasks) => {
    let thisForm = document.getElementById("taskForm")
    console.log(thisForm)
    let task = {}
    
    const formTitle = document.getElementById("newTaskTitle")
    const formDescrip = document.getElementById("newTaskDescription")
    console.log(formTitle)
    console.log(formDescrip)

    task.description = formDescrip.value
    task.name = formTitle.value
    task.hours = 0
    task.id = changes.newTasks.length

    // TODO move this to backend after i've made a fetch req
    let newDate = new Date()
    let newMonth = newDate.getMonth()
    let timestamp = `${newMonth}-${newDate.getFullYear()}`
    task.creationDate = timestamp

    changes.newTasks.push(task)
    console.log("New task")
    console.log(task)
    console.log("New task saved. All new tasks:")
    console.log(changes.newTasks)
    
    while(thisForm.firstChild){
        thisForm.removeChild(thisForm.firstChild)
    }
    let CreateLocation = document.getElementById("tasklist")
    CreateLocation.removeChild(thisForm)

    return task
}

export const createTaskForm = (CreateLocation, isCreated, changes, currentTasks, username) => {
    console.log("Creating new task form")
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
    taskTitle.setAttribute("id", "newTaskTitle")
    
    descriptionPrompt.classList.add("prompt")
    taskTitle.classList.add("textbox")
    taskDescription.setAttribute("type", "text")
    taskDescription.setAttribute("id", "newTaskDescription")

    titlePrompt.innerText = "Title of your Task:"
    descriptionPrompt.innerText = "Description:"

    form.appendChild(titlePrompt)
    form.appendChild(taskTitle)
    form.appendChild(descriptionPrompt)
    form.appendChild(taskDescription)
    CreateLocation.appendChild(form)
    taskTitle.focus()

    form.addEventListener("click", (e) => {
        console.log("removing form")
        let task = saveNewTask(changes, currentTasks)
        console.log("adding new collapsed task")
        console.log(task)
        createNewCollapsedTask(task, currentTasks, CreateLocation, changes, username)
        isCreated = false
    }, {once:true})
    
}
// tasks, task, CreateLocation, changes, username
export const createNewCollapsedTask = (task, tasks, CreateLocation, changes, username) => {
    //let CreateLocation = document.getElementById("tasklist")
    let newTask = document.createElement("div")
    newTask.classList.add("collapsed")
    newTask.classList.add("new")
    newTask.setAttribute("id", `newTask-${task.id}`)

    let taskTitle = document.createElement("div")
    taskTitle.classList.add("taskTitle")
    taskTitle.innerText = task.name

    newTask.appendChild(taskTitle)
    CreateLocation.appendChild(newTask)

    newTask.addEventListener("click", (e) => {
        console.log("Triggered crewateNewCollapsed's event listner. calling handleClick()")
        handleTaskClick(newTask, tasks, changes, username, e.target)
    }, {once : true})
}

export const handleTaskClick = (htmlTask, tasks, changes, username, target) => {
    console.log(htmlTask)
    if(htmlTask.id.includes("newTask")){
        console.log("newTask was in ID")
        expandNewTask(tasks, changes, htmlTask, username)
    }
    else if(htmlTask.id.includes("task")){
        console.log("newTask was not in ID")
        expandForm(htmlTask, tasks, changes, username)
    }
    else{
        // reapply the click event listner
    }

    console.log("exiting handleClick()")
}

export const expandNewTask = (tasks, changes, htmlTask, username) => {
    let id = htmlTask.id.split("-")[1]
    let taskInfo = changes.newTasks[id]
    console.log("Expanding new task")
    console.log(id)
    console.log(changes)
    htmlTask.classList.toggle("collapsed")
    htmlTask.classList.toggle("uncollapsed")

    let container = document.createElement("div")
    let taskDescription = document.createElement("div")
    let formLogs = document.createElement("div")
    let logTitle = document.createElement("div")

    container.setAttribute("id", "formContainer")
    container.classList.add("container")
    formLogs.classList.add("formLogs")
    logTitle.classList.add("logTitle")
    taskDescription.classList.add("taskDescription")


    console.log(changes)
    taskDescription.innerText = changes.newTasks[id].description
    container.appendChild(taskDescription)

    logTitle.innerText = "CONTRIBUTOR : HOURS"
    container.appendChild(logTitle)
    console.log(container)
    console.log(parent)
    console.log(htmlTask)

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
    console.log("Adding form:")
    console.log(newForm)
    console.log("to container:")
    console.log(container)

    const createLogs = (number, Hours, PlacementLocation) => {
        let log = document.createElement("div")
        log.setAttribute("id", `log-${number}`)
        log.classList.add("log")

        let content = document.createElement("div")
        content.innerText = `{ Contributor ${Hours.contributor} logged ${Hours.hours} hours }`

        log.appendChild(content)
        PlacementLocation.appendChild(log)
        
    }
    console.log(changes)
    
    for(let i = 0; i < changes.length; i++){
        console.log(changes.newTasks[i])
        if(changes.newLogs[i].id == id){
            createLogs(id, changes.newLogs[i], container)
        }
    }


    container.appendChild(formLogs)
    htmlTask.appendChild(container)
    // TODO fix this. saveNewLog should be specifying where the task info is going to go
    newForm.addEventListener("submit", (e) => {
        e.preventDefault();
        saveNewTaskLogs(changes, id, username)// <-- will get new parameters as time goes on to save new elements
        console.log(changes)
        collapseTask(container, tasks, changes, username)
    }, {once:true})
}

export const saveNewTaskLogs = (changes, taskid, username) => {
    let newHours = document.getElementById("newHours")

    let newLog = {}
    newLog.hours = Number(newHours.value)
    newLog.id = Number(taskid)
    newLog.contributor = username

    changes.newTaskLogs.push(newLog)
}

export const saveNewLog = (changes, taskID, username) => {
    let newHours = document.getElementById("newHours")

    let newLog = {}
    newLog.hours = Number(newHours.value)
    newLog.id = taskID
    newLog.contributor = username

    changes.newLogs.push(newLog)
}

export const expandForm = (task, tasks, changes, username) => {
    console.log("Expanding form")
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
    console.log(`Element array position: ${taskID} | HTML element ID(without split): ${task.id}`)
    

    taskDescription.innerText = tasks[taskID].description
    container.appendChild(taskDescription)

    logTitle.innerText = "CONTRIBUTOR: HOURS"
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
    
    if(tasks[taskID].hours.length > 0){
        for(let i = 0; i < tasks[taskID].hours.length; i++){
            createLogs(i, tasks[taskID].hours[i], formLogs)
        }
    }

    console.log(changes)
    console.log(changes.newLogs)
    if(changes?.newLogs){
        for(let i = 0; i < changes.newLogs.length; i++){
            
            if(changes.newLogs[i].id == taskID + 1){
                console.log("Found a new log:")
                console.log(changes.newLogs[i])
                createLogs(`c-${i}`, changes.newLogs[i], formLogs)
            }
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
    console.log("Adding form:")
    console.log(newForm)
    console.log("to container:")
    console.log(container)
    

    newForm.addEventListener("submit", (e) => {
        e.preventDefault();
        saveNewLog(changes, taskID + 1, username)// <-- will get new parameters as time goes on to save new elements
        console.log(changes)
        collapseTask(container, tasks, changes, username)
    }, {once:true})
}

export const collapseTask = (taskContainer, tasks, changes, username) => {
    console.log(taskContainer)

    while(taskContainer.firstChild){
        taskContainer.removeChild(taskContainer.firstChild)
    }
    let parent = taskContainer.parentElement
    parent.classList.toggle("uncollapsed")
    parent.classList.toggle("collapsed")
    parent.removeChild(taskContainer)
    console.log("Adding event listener to:")
    console.log(parent)

    parent.addEventListener("click", () => {
        if(newPath == true){
            handleTaskClick(parent, tasks, changes, username)
        }
        else{
            expandForm(parent, tasks, changes, username)
        }
    }, {once : true})
}

export const fetchToSave = (tasks, techs, description, projname) => {

}