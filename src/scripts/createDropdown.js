const techList = document.getElementById('techList');
const taskList = document.getElementById('taskList');

const jsDropdown = document.getElementById('jsDropdown');
const cppDropdown = document.getElementById('cppDropdown');
const csDropdown = document.getElementById('csDropdown');
const pythonDropdown = document.getElementById('pythonDropdown');

const jsOptions = ["HTML", "CSS", "ReactJS", "ChartJS", "Websockets", "Socket.io", "Node.js", "Express.js", "Vue.js"]
const cppOptions = [".NET", "wxWidgets", "Qt"];
const csOptions = ["ASP.NET", "Unity", "Blazor", "Xamarin"];
const pythonOptions = ["Django", "Flask", "CherryPy", "TensorFlow", "NumPy"];
const DBOptions = ["MySQL", "Reddis", "Memcached", "Cassandra", "MongoDB", "Postgres"]

const jsMenu = document.getElementById('jsMenu')
const pythonMenu = document.getElementById('pythonMenu')
const cppMenu = document.getElementById('cppMenu')
const csMenu = document.getElementById('csMenu')

const dropdowns = [
    {dropdown : jsDropdown, options : jsOptions, menu : jsMenu},
    {dropdown : cppDropdown, options : cppOptions, menu : cppMenu},
    {dropdown : csDropdown, options : csOptions, menu : csMenu},
    {dropdown : pythonDropdown, options : pythonOptions, menu : pythonMenu}
]

let activeDropdown
let openDropdown = false
//TODO link to html, and also add the creation of the display div to indicate the div is included inside
// the area



// techs = currentTechs the user has
// techFrame => assist with closing the menu if click is out of bounds
// Options => each item to be created in the dropdown menu
export const createTechDropdown = (techs, CreateLocation, Options, techFrame) => {

    if(openDropdown == true){
        removeDropdown(activeDropdown)
    }
    openDropdown = true
    activeDropdown = CreateLocation

    for(let option of Options){
        if(!techs.includes(option)){
            let techOption = document.createElement("div")
            techOption.classList.add("option")
            let optionID = `-${option}`
            techOption.setAttribute("id", optionID)
            techOption.innerText = option
            CreateLocation.appendChild(techOption)
        }
    }
    // event listener to close dropdown when click is out of range
    window.addEventListener("click", (e) => {
        if(openDropdown && !CreateLocation.contains(e.target)){
            removeDropdown(CreateLocation)
        }
    })

    window.removeEventListener("click", setupDropdown)
    // event listener to remove an item from the dropdown
    CreateLocation.addEventListener("click", (e) => {
        handleOptionClick(e.target.innerText, CreateLocation, techs)
    })
}

export const removeDropdown = (RemoveLocation) => {
    console.log(`Removing children from:`)
    console.log(RemoveLocation)
    while(RemoveLocation.hasChildNodes()){
        RemoveLocation.removeChild(RemoveLocation.firstChild)
    }

    window.removeEventListener("click", (e) => {
        if(openDropdown && !CreateLocation.contains(e.target)){
            removeDropdown(CreateLocation)
        }
    })
/*
    window.removeEventListener("click", (e) => {
        if(openDropdown && !RemoveLocation.contains(e.target)){
            removeDropdown(e.target.parentElement)
        }
    })*/

    openDropdown = false
    activeDropdown = null
}

export const handleOptionClick = (itemID, RemoveLocation, CurrentList) => {
    console.log(`looking to remove item with id of ${itemID}`)
    let remove = document.getElementById(`-${itemID}`)
    CurrentList.push(itemID)
    console.log(remove)
    RemoveLocation.removeChild(remove)
    console.log(CurrentList)
    
    let techList = document.getElementById("techlist")
    addCurrentTech(techList, itemID)
}

export const addCurrentTech = (location, text) => {
    let newDisplay = document.createElement("div")
    newDisplay.classList.add("curTech")
    newDisplay.setAttribute("id", `${text}`)
    newDisplay.innerText = text
    location.appendChild(newDisplay)
}

export const removeCurrentTech = (location, text, currentTechs) => {
    let remove = document.getElementById(`${text}`)
    location.removeChild(remove)
    let index = -1;

    // find remove index to remove
    for(let i = 0; i < currentTechs.length; i++){

        if(currentTechs[i] == `${text}`){
            index = i
        }
    }

    // remove the index
    if(index >= 0){
        currentTechs.splice(index, 1)
    }else {
        console.log("No current tech with that text was found")
    }
}