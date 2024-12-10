
import { fetchProject } from "./fetchProject.js"
import { createTechDropdown, removeDropdown, handleOptionClick, addCurrentTech, removeCurrentTech } from "../createDropdown.js"

const particularProjID = window.location.pathname.split("/")[2]

const url = "http://localhost:5000/logProject/getProject/" + particularProjID
console.log(url)

const techList = document.getElementById('techlist')

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

window.onload = async () => {
    const project = await fetchProject()

    currentTechs = project.projectData.techs
    currentTasks = project.projectData.tasks

    console.log(techList)

    for(let tech of currentTechs){
        addCurrentTech(techList, tech)
    }
    // add event listener for tech dropdowns
    window.addEventListener("click", setupDropdown)
    


    // add event listener for curTech removal
    techList.addEventListener("click", (e) => {
        removeCurrentTech(techList, e.target.innerText, currentTechs)
    })
    // add event listener for task selection/editing

    // add event listener for submit button
}

// NEXT incorporate 'activeDropdown' as a param
// figure out how to get the event listener that sets up drop downs(calls the below function), to get removed.
// idea: google "how to find all event listeners that are currently active?"
/////////////////////////////////////////////////////
export const setupDropdown = (e) => {
    
    if(activeDropdown){
        removeDropdown(activeDropdown)
    }

    if(jsClickable.contains(e.target)){
        createTechDropdown(currentTechs, Javascript, jsOptions)
    }
    else if(cppClickable.contains(e.target)){
        createTechDropdown(currentTechs, Cpp, cppOptions)
    }
    else if(csClickable.contains(e.target)){
        createTechDropdown(currentTechs, Csharp, csOptions)
    }
    else if(pythonClickable.contains(e.target)){
        createTechDropdown(currentTechs, Python, pythonOptions)
    }
    // add database dropdown here
}