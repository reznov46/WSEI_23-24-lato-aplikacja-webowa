import React, { useState } from "react";
import { Project } from "../models/Project";

interface ProjectFormProps {
  projectToEdit?: Project;
  onSave: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectToEdit, onSave }) => {
  const [name, setName] = useState(projectToEdit ? projectToEdit.name : "");
  const [description, setDescription] = useState(
    projectToEdit ? projectToEdit.description : ""
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProject: Project = {
      ...projectToEdit,
      name,
      description,
    };

    setName("");
    setDescription("");
    onSave(newProject);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nazwa:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Opis:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">
        {projectToEdit ? "Zapisz zmiany" : "Dodaj projekt"}
      </button>
    </form>
  );
};

export default ProjectForm;
