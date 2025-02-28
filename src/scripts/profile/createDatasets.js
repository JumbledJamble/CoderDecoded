export const createTotalTimeProjDataset = (project, logs, timestamp) => {
    // timestamp being passed in will correlate to the initial timestamp of the 6month interval
    let month = parseInt(timestamp.split("-")[0])
    let year = parseInt(timestamp.split("-")[1])
    let endingMonth = month + 7
    let totalThisMonth = 0

    let dataset = {
        label: project.name,
        data: []
    }
    for(let i = month; i < endingMonth; i++){
        // look through each month
        totalThisMonth = 0
        //console.log(`Inspecting month number: ${i}`)

        for(let j = 0; j < logs.length; j++){
            // if we're looking at the right project
            //console.log("Inspecting log:")
            //console.log(logs[j])
            if(logs[j].projectName == project.name){
                // if we're looking at the right month
                if(logs[j].timeStamp.split("-")[0] == i){
                    totalThisMonth += logs[j].hours
                }
            }
        }
        console.log(`Month iterator: ${i} @ ${totalThisMonth}`)
        dataset.data.push(totalThisMonth)

    }



    return dataset
}


export const createPercentTimeProjDataset = (logs) => {
    // this is the information that will be built up over time, then returned
    let datasets = []
    let labels = []
    // these are helper maps for organizing information
    let projects = {}
    let names = {}

    for(let log of logs){
        //console.log(log)
        if(projects[log.projectID]){
            projects[log.projectID] += log.hours
        }else{
            names[log.projectID] = log.projectName
            projects[log.projectID] = log.hours
        }
    }

    //console.log(projects)
    //console.log(names)

    for(let project in projects){
        datasets.push(projects[project])
        labels.push(names[project])
    }

    console.log(datasets)
    console.log(labels)

    return { datasets, labels }
}

export const createTasksPerProjDatasets = (projects) => {
    let labels = {}
    for(let project of projects){
        for(let task of project.tasks){
            if(task.active == true){
                if(labels[project.name]){
                    labels[project.name] += 1
                    console.log(`${project.name}: INC : ${labels[project.name]}`)
                }else{
                    labels[project.name] = 1
                    console.log(`${project.name}: INIT : ${labels[project.name]}`)
                }
            }
        }
    }

    let datasets = []
    for(let label in labels){
        datasets.push({projectName : label, value : labels[label]})
    }
    
    return datasets
}

export const createTechStackDatasets = (projects) => {
    let datasets = [];

    for(let project of projects){
        datasets.push({
            value: project.techs.length,
            projectName: project.name
        })
    }

    return datasets
}