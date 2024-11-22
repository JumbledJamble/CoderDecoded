export const createDataset = (project, logs, timestamp) => {
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
        console.log(`Inspecting month number: ${i}`)

        for(let j = 0; j < logs.length; j++){
            // if we're looking at the right project
            console.log("Inspecting log:")
            console.log(logs[j])
            if(logs[j].projectName == project.name){
                // if we're looking at the right month
                let inspectMonth = logs[j].timeStamp.split()
                if(logs[j].timeStamp.split("-")[0] == i){
                    totalThisMonth += logs[j].hours
                }
            }
        }
        dataset.data.push(totalThisMonth)

    }



    return dataset
}