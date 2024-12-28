export const submitProjectChanges = async (changes, particularProjID, techs) => {

    changes.techs = techs

    const url = "http://localhost:5000/logProject/" + particularProjID

    console.log("Submitting changes:")
    console.log(changes)

    console.log("Submitting to server")
    try {
    const res = await fetch(url, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ changes }),

    });

    const data = await res.json();
    
    if(data.error){
        console.log(error)
    }
    else{
        location.assign(`/profile`);
    }
    

    }
    catch (err) {
        console.log(err);
    }
};