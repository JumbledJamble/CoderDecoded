export const createProjDisplay = (displayProjects, info) => {
    let panel = document.createElement("div")
    panel.classList.add("displayProject")
    panel.innerText = info.name

    displayProjects.appendChild(panel)

    console.log(`${info._id}`)
    panel.addEventListener("click", () => {
        location.assign(`/logProject/${info._id}`)
    })
    
}