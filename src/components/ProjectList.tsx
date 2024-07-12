import React from "react";
import { Project } from "../models/Project";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onSelectActive: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onEdit,
  onSelectActive,
  onDelete,
}) => {
  return (
    <div>
      <h2>Projects list</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name}
            <button onClick={() => onEdit(project)}>Edit</button>
            <button onClick={() => onDelete(project.id!)}>Delete</button>
            <button onClick={() => onSelectActive(project.id!)}>
              Set as active
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
