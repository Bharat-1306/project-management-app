import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import ProjectSideBar from "./components/ProjectSideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";

function App() {
  const [projectSelected, setProjectSelected] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
  //undefined - nothing
  // null - adding a new project
  // the purpose is to maintain the object is : further it helps in maitaing the projected if we have the multiple

  function handleProjectSelection() {
    setProjectSelected((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    const NewProject = {
      ...projectData,
      id:Math.random()
    }
    setProjectSelected(prevState => {
      return {
        ...prevState,
        selectedProjectId : undefined, //once clicked on save the component should close
        projects :[...prevState.projects , NewProject]
        // ...prevState.projects - we added this bcs we dont want to loose the previous data
      }
    })
  } 

  function handleCancelProject() {
    setProjectSelected((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  let content;
  if (projectSelected.selectedProjectId === null) {
    content = <NewProject onAddNewProject={handleAddProject} onCancelProject={handleCancelProject}/>;
  } else if (projectSelected.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleProjectSelection} />;
  }

  // console.log(projectSelected)

  return (
    <>
      {/* <head>
      need to add something
    </head> */}
      <main className="h-screen my-8 flex gap-8">
        <ProjectSideBar onAddProject={handleProjectSelection} projects={projectSelected.projects}/>
        {/* {projectSelected ? <NewProject /> : <NoProjectSelected onAddProject={handleProjectSelection} /> } */}
        {content}
      </main>
    </>
  );
}

export default App;
