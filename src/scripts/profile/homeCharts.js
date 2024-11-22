export const fetchProjects = async () => {
    const url = "http://localhost:5000/profile/getUsersProjects";
    try {
      const response = await fetch(url, {
        method: "get",
      });
      if (!response.ok) {
        console.log("Error, response not ok")
      }
  
      const projects = await response.json();
      console.log("Valid response, logging project data:")
      console.log(projects);
      return projects
    } catch (error) {
      console.error(error.message);
    }
  }