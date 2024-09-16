import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import ProjectSideBar from "./components/ProjectSideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
function App() {
  const [projectSelected, setProjectSelected] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  //undefined - nothing
  // null - adding a new project
  // the purpose is to maintain the object is : further it helps in maitaing the projected if we have the multiple

  function handleAddTask(text) {
    
    setProjectSelected((prevState) => {
      const taskId = Math.random()
      const newTask = {
        text : text,
        projectId:prevState.selectedProjectId,
        id:taskId
      }
      return {
        ...prevState,
        tasks: [newTask , ...prevState.tasks]
        // projects: [...prevState.projects, NewTask],
        // ...prevState.projects - we added this bcs we dont want to loose the previous data
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectSelected((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        ),
      };
    });
  }

  function handleProjectSelection() {
    setProjectSelected((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectSelected((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleAddProject(projectData) {
    const NewProject = {
      ...projectData,
      id: Math.random(),
    };
    setProjectSelected((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined, //once clicked on save the component should close
        projects: [...prevState.projects, NewProject],
        // ...prevState.projects - we added this bcs we dont want to loose the previous data
      };
    });
  }

  function handleCancelProject() {
    setProjectSelected((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectSelected((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const seletedProject = projectSelected.projects.find(
    (project) => project.id === projectSelected.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={seletedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectSelected.tasks}
    />
  );
  if (projectSelected.selectedProjectId === null) {
    content = (
      <NewProject
        onAddNewProject={handleAddProject}
        onCancelProject={handleCancelProject}
      />
    );
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
        <ProjectSideBar
          onAddProject={handleProjectSelection}
          projects={projectSelected.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId = {projectSelected.selectedProjectId  }
        />
        {/* {projectSelected ? <NewProject /> : <NoProjectSelected onAddProject={handleProjectSelection} /> } */}
        {content}
      </main>
    </>
  );
}

export default App;
