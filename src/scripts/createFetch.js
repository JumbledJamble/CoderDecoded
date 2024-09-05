import { inputs } from "./create.js"
const form = document.querySelector('form')
const submit = document.getElementById('create');
const currentTasks = inputs.currentTasks;
const currentTechs = inputs.currentTechs
console.log("hey there")


submit.addEventListener('click', async (e) => {
    console.log("Submitting form")
    e.preventDefault();


    // get values
    const title = form.title.value;
    const description = form.description.value;
    
    console.log(title, description)

    const project = {
    title : title,
    description : description,
    tasks : currentTasks,
    techs : currentTechs,
    }
    
    try {
    const res = await fetch('/createProject', { 
        method: 'POST', 
        body: JSON.stringify({ project }),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    console.log(data)
    if (data.errors) {
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
    }
    if (data.user) {
        location.assign('/');
    }

    }
    catch (err) {
    console.log(err);
    }
});