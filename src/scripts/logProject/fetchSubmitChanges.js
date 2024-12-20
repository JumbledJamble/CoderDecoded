export const submitProjectChanges = async (changes) => {


    
    try {
    const res = await fetch('/logProject', { 
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