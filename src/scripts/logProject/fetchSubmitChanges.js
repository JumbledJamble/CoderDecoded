export const submitProjectChanges = async (changes, particularProjID) => {

    const url = "http://localhost:5000/logProject/" + particularProjID
    // TODO double check url works
    try {
    const res = await fetch(url, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ changes }),

    });

    const data = await res.json();
    console.log(data)
    location.assign(`/profile`);
    

    }
    catch (err) {
        console.log(err);
    }
};