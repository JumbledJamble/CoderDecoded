export const fetchProject = async () => {
    const particularProjID = window.location.pathname.split("/")[2]

    const url = "http://localhost:5000/logProject/getProject/" + particularProjID
    console.log(url)
    try {
      const response = await fetch(url, {
        method: "get",
      });
      if (!response.ok) {
        console.log("Error, response not ok")
      }
  
      const project = await response.json();
      console.log("Valid response, logging project data:")
      console.log(project);
      return project
    } catch (error) {
      console.error(error.message);
    }
  }