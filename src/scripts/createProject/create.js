const techList = document.getElementById('techList');
const taskList = document.getElementById('taskList');

const jsDropdown = document.getElementById('jsDropdown');
const cppDropdown = document.getElementById('cppDropdown');
const csDropdown = document.getElementById('csDropdown');
const pythonDropdown = document.getElementById('pythonDropdown');

const jsOptions = ["HTML", "CSS", "ReactJS", "ChartJS", "MongoDB", "Reddis", "Websockets", "Node.js", "Express.js", "Vue.js"]
const cppOptions = [".NET", "wxWidgets", "Qt"];
const csOptions = ["ASP.NET", "Unity", "Blazor", "Xamarin"];
const pythonOptions = ["Django", "Flask", "CherryPy", "TensorFlow", "NumPy"];

const jsMenu = document.getElementById('jsMenu')
const pythonMenu = document.getElementById('pythonMenu')
const cppMenu = document.getElementById('cppMenu')
const csMenu = document.getElementById('csMenu')

const taskInput = document.getElementById("tasks")
const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")

const dropdowns = [
    {dropdown : jsDropdown, options : jsOptions, menu : jsMenu},
    {dropdown : cppDropdown, options : cppOptions, menu : cppMenu},
    {dropdown : csDropdown, options : csOptions, menu : csMenu},
    {dropdown : pythonDropdown, options : pythonOptions, menu : pythonMenu}
]

const currentTasks = [];
const currentTechs = [];

import { createTask } from "./createTask.js"

export const inputs = {
    currentTasks, currentTechs,
}

window.onload = setupPage;


function setupPage(){
    dropdowns.forEach(dropdownInfo => {
        setupDropdown(dropdownInfo);
    })

    console.log("Adding event listener to taskInput")
    console.log(taskInput)
    taskInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && taskInput.value != ''){
            e.preventDefault()
            createTask(taskList, taskInput.value, currentTasks)
            taskInput.value = ''
        }
    })

}

taskList.addEventListener("click", (event) => {
    try{
        if(event.target.contains(event.target)){
            
        taskList.removeChild(event.target)
        console.log(`${event.target.innerText} removed`)
        }
    }catch{
        (e) => {
            console.log(e)
        }
    }
})

techList.addEventListener("click", (event) => {
    techList.removeChild(event.target);
})





const setupDropdown = (dropdownInfo) =>{
    let options = dropdownInfo.options;
    let menu = dropdownInfo.menu;
    let dropdown = dropdownInfo.dropdown;


    dropdown.addEventListener("click", createMenu)



    function createMenu(event){
        // for each option that menu can have, create a new element to populate the new menu
        options.forEach(option => {
            if(!currentTechs.includes(option)){
                let newElement = document.createElement("div");
                newElement.classList.add('option');
                newElement.setAttribute('id', `${option}`)
                newElement.innerText = `${option}`
                menu.appendChild(newElement)
            }
        })

    if (!menu.classList.contains('invisible')) {
        window.addEventListener("click", closeMenu);
    }
    dropdown.removeEventListener("click", createMenu)
    }

    function closeMenu(event){
            
        if(menu.contains(event.target)){
            currentTechs.push(event.target.id)
            console.log(`${event.target.id} added to list. The list:`)

            let newTech = document.createElement('div');
            newTech.innerText = event.target.id;
            newTech.setAttribute('id', `${event.target.id}`)
            newTech.classList.add('techItem')
            techList.appendChild(newTech)

        }
        if (!dropdown.contains(event.target) && !menu.contains(event.target)) {
            while(menu.hasChildNodes()){
                menu.removeChild(menu.firstChild)
            }
            setupDropdown(dropdownInfo)
            window.removeEventListener("click", closeMenu);

        }
    };


}


const cancel = document.getElementById("cancel")

cancel.addEventListener("click", () => {
    location.assign("/profile")
})