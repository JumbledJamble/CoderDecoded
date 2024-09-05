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

const dropdowns = [
    {dropdown : jsDropdown, options : jsOptions, menu : jsMenu},
    {dropdown : cppDropdown, options : cppOptions, menu : cppMenu},
    {dropdown : csDropdown, options : csOptions, menu : csMenu},
    {dropdown : pythonDropdown, options : pythonOptions, menu : pythonMenu}
]

let currentTasks = ["Add Ability To Save Decks", "Add Responsive Dom Interaction"];
let currentTechs = [];

export const inputs = {
    currentTasks, currentTechs,
}

window.onload = setupPage;


function setupPage(){
    dropdowns.forEach(dropdownInfo => {
        setupDropdown(dropdownInfo);
    })
}

taskList.addEventListener("click", (event) => {
    console.log(event.target)

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

function setupDropdown(dropdownInfo){
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

            // after all children have been created, make menu visible
    //menu.classList.toggle('invisible');
    // add event listener to set the menu back to invisible
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



// module.exports = { currentTasks, currentTechs }