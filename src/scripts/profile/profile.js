import { fetchProjects } from "./homeCharts.js"
import { createProjDisplay } from "./createProjDisplay.js"
import { createDataset } from "./createDataset.js"


const timePerProject = document.getElementById("timePerProj").getContext('2d')
const percentTimePerProj = document.getElementById("percentTimePerProj").getContext('2d')
const openTasksPerProj = document.getElementById("openTasksPerProj").getContext('2d')
const techsPerProj = document.getElementById("techsPerProj").getContext('2d')


const openProjects = document.getElementById("openProjects")
const displayProjects = document.getElementById("displayProjects")
const newProject = document.getElementById("newProject")

const logout = document.getElementById("logout")
var projects;
var user;
var activeTab;

const colors = [
    'rgb(255, 80, 80)', 'rgb(37, 59, 184)', 'rgb(221, 21, 204)'
]

const backgroundColors = [
    'rgb(228, 28, 28)', 'rgb(13, 37, 172)', 'rgb(179, 3, 164)'
]

window.onload = async () => {
    const data = await fetchProjects()
    projects = data.usersProjects
    user = data.user
    for(let project of projects){
        if(project.active == true){
            let projInfo = {_id: project._id, name: project.name}
            createProjDisplay(displayProjects, projInfo)
        }
    }
    activeTab = openProjects
    openProjects.classList.add("active")
    displayProjects.classList.add("active")
    newProject.addEventListener("click", () => {
        location.assign("/createProject")
    })

    logout.addEventListener("click", () => {
        location.assign("/logout")
    })


    let currentDate = new Date()
    let remainder
    let currentMonth = parseInt(currentDate.getMonth()) + 1
    let currentYear = parseInt(currentDate.getFullYear())

    if(currentMonth <= 6 ){
        console.log("Month was in the beginning of the year. Rolling back to find beginning")
        remainder = 6 - currentMonth
        currentMonth = 12 - remainder
        currentYear -= 1
    }else { currentMonth -= 6}
    let initialTimeStamp = `${currentMonth}-${currentYear}`
    const datasets = []
    for(let i = 0; i < projects.length; i++){
        let subset = createDataset(projects[i], user.logs, initialTimeStamp)
        subset.backgroundColor = backgroundColors[i]
        subset.borderColor = colors[i]
        datasets.push(subset)
    }
    console.log("After constructing all datasets:")
    console.log(datasets)
    let labels = []
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let val
    for(let i = 0; i < 7; i++){
        val = currentMonth + i - 1
        if(val >= 13){
            val -= 12
        }
        labels[i] = months[val]
    }
    
    const timeProjectGraph = new Chart(timePerProject, {
        type: 'line',
        data: {
            labels : labels,
            datasets : datasets

        },

        options: {}
    })
}