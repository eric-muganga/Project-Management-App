import { useState } from "react";
import ProjectsSidebar from "./Components/ProjectsSidebar.jsx";
import NewProject from "./Components/NewProject.jsx";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import SelectedProject from "./Components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })


  function handleStartAddProject(){
    setProjectState(prevState =>{
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }


  function handleCancelAddProject(){
    setProjectState(prevState =>{
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  
  function handleAddProject(projectsData){
    setProjectState(prevState =>{
      const newProject ={
        ...projectsData,
        id: projectsData.title
      }
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }


  function handleSelectProject(id){
    setProjectState(prevState =>{
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }


  function handleDeleteProject(){
    setProjectState(prevState =>{
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id  !== prevState.selectedProjectId)
      }
    })
  }

  function handleAddTask(text){
    setProjectState(prevState =>{
      const taskId = Math.random();
      const newTask ={
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }
      return{
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectState(prevState =>{
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id  !== id)
      }
    })
  }

  const selectedPrject = projectState.projects.find(project=> project.id === projectState.selectedProjectId)

  let content = (
    <SelectedProject 
      project={selectedPrject} 
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />);

  if(projectState.selectedProjectId=== null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  }else if (projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className='h-screen my-8 flex gap-8' >
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
