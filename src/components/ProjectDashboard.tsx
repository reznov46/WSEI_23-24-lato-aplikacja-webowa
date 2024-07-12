import { useState } from "react";
import { Project } from "../models/Project";
import ProjectService from "../services/ProjectService";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import { ActiveProjectDashboard } from "./ActiveProjectDashboard";

export const ProjectDashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(
    undefined
  );
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    ProjectService.getActiveProject()
  );
  const [projects, setProjects] = useState<Project[]>(
    ProjectService.getProjects()
  );
  const handleEdit = (project: Project) => {
    setShowForm(true);
    setProjectToEdit(project);
  };

  const handleSave = (project: Project) => {
    if (project.id) {
      ProjectService.updateProject(project);
    } else {
      ProjectService.addProject(project);
    }
    setProjects(ProjectService.getProjects());
    setShowForm(false);
  };

  const selectActive = (id: string) => {
    ProjectService.setAsActive(id);
    setActiveProject(ProjectService.getActiveProject());
  };

  const handleDelete = (id: string) => {
    ProjectService.deleteProject(id);
    setProjects(ProjectService.getProjects());
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
    if (projectToEdit) {
      setProjectToEdit(undefined);
    }
  };
  return (
    <>
      <div className="three-column-container">
        <div className="column column-1">
          <h1>ManagMe</h1>
          <button onClick={handleToggleForm}>
            {showForm ? "Hide form" : "Add new"}
          </button>
          {showForm && (
            <ProjectForm projectToEdit={projectToEdit} onSave={handleSave} />
          )}
          <ProjectList
            projects={projects}
            onEdit={handleEdit}
            onSelectActive={selectActive}
            onDelete={handleDelete}
          />
        </div>
        {activeProject && (
          <div className="column column-2">
            <ActiveProjectDashboard activeProject={activeProject} />
          </div>
        )}
      </div>
      {/* <div className="three-column-container">
        <div className="column column-1">
          <UserDashboard />
        </div>
      </div> */}
    </>
  );
};
