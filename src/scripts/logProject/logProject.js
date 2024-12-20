
import { fetchProject } from "./fetchProject.js"
import { createTechDropdown, removeDropdown, handleOptionClick, addCurrentTech, removeCurrentTech } from "../createDropdown.js"
import { createCollapsedTask, createTaskForm, saveNewTask, expandForm, collapseTask } from "../createTaskForm.js"
import { submitProjectChanges } from "./fetchSubmitChanges.js"

const particularProjID = window.location.pathname.split("/")[2]
const submitButton = document.getElementById("submitProjChanges")

const url = "http://localhost:5000/logProject/getProject/" + particularProjID
console.log(url)

const techList = document.getElementById('techlist')
const taskList = document.getElementById("tasklist")

const Csharp = document.getElementById("Csharp")
const csClickable = document.getElementById("csClickable")

const Python = document.getElementById("Python")
const pythonClickable = document.getElementById("pythonClickable")

const Cpp = document.getElementById("Cpp")
const cppClickable = document.getElementById("cppClickable")

const Javascript = document.getElementById("Javascript")
const jsClickable = document.getElementById("jsClickable")



const jsOptions = ["HTML", "CSS", "ReactJS", "ChartJS", "Websockets", "Socket.io", "Node.js", "Express.js", "Vue.js"]
const cppOptions = [".NET", "wxWidgets", "Qt"];
const csOptions = ["ASP.NET", "Unity", "Blazor", "Xamarin"];
const pythonOptions = ["Django", "Flask", "CherryPy", "TensorFlow", "NumPy"];
const DBOptions = ["MySQL", "Reddis", "Memcached", "Cassandra", "MongoDB", "Postgres"]

var currentTasks = [];
var currentTechs = [];
let activeDropdown
let openDropdown = false
var changes = {}
changes.newLogs = []
changes.newTasks = []

window.onload = async () => {
    const project = await fetchProject()

    const projectTitle = document.getElementById("projectTitle")
    projectTitle.innerText = project.projectData.name

    currentTechs = project.projectData.techs
    currentTasks = project.projectData.tasks

    console.log(project.projectData)


    // TECHS
    for(let tech of currentTechs){
        addCurrentTech(techList, tech)
    }
    // add event listener for tech dropdowns
    window.addEventListener("click", setupDropdown, {once: true})


    // add event listener for curTech removal
    techList.addEventListener("click", (e) => {
        removeCurrentTech(techList, e.target.innerText, currentTechs)
    })

    // TASKS
    for(let task of currentTasks){
        createCollapsedTask(currentTasks, task, taskList)
    }

    console.log("Completed")


    // SUBMIT
    // add event listener for submit button
    submitButton.addEventListener("click", (e) => {
        // fetch changes here
        submitProjectChanges(changes)
        console.log("Submitted")
    })
}

// TODO incorporate 'activeDropdown' as a param
/////////////////////////////////////////////////////
export const setupDropdown = (e) => {
    
    if(activeDropdown){
        removeDropdown(activeDropdown)
    }

    if(jsClickable.contains(e.target)){
        createTechDropdown(currentTechs, Javascript, jsOptions, setupDropdown)
    }
    else if(cppClickable.contains(e.target)){
        createTechDropdown(currentTechs, Cpp, cppOptions, setupDropdown)
    }
    else if(csClickable.contains(e.target)){
        createTechDropdown(currentTechs, Csharp, csOptions, setupDropdown)
    }
    else if(pythonClickable.contains(e.target)){
        createTechDropdown(currentTechs, Python, pythonOptions, setupDropdown)
    }
    // add database dropdown here
}