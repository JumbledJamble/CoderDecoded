import { inputs } from "./create.js"
const form = document.querySelector('form')
const submit = document.getElementById('create');
const currentTasks = inputs.currentTasks;
const currentTechs = inputs.currentTechs


submit.addEventListener('click', async (e) => {
    console.log("Submitting form")
    e.preventDefault();

    // get values
    const title = form.title.value;
    const description = form.description.value;
    if(title == '' || description == ''){
        console.log("Missing required field! Enter title and password.")
        return null
    }
    
    console.log(title, description)
    console.log(currentTasks)
    console.log(currentTechs)

    const project = {
    name : title,
    description : description,
    tasks : currentTasks,
    techs : currentTechs,
    }
    
    try {
    const res = await fetch('/createProject', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ project }),

    });

    const data = await res.json();
    console.log(data)
    location.assign(`/profile`);
    

    }
    catch (err) {
    console.log(err);
    }
});