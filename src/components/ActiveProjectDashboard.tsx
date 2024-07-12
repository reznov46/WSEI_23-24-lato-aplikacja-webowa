import { Project } from "../models/Project";
import { ProjectStories } from "./ProjectStories";
import { TaskDashboard } from "./TaskDashboard";

interface ActiveProjectDashboardProps {
  activeProject: Project | undefined;
}
export const ActiveProjectDashboard: React.FC<ActiveProjectDashboardProps> = ({
  activeProject,
}) => {
  if (!activeProject) {
    return <span>No active project selected</span>;
  }

  return (
    <div>
      <h1>Active Project</h1>
      <h2>{activeProject.name}</h2>
      <p>{activeProject.description}</p>
      <ProjectStories projectId={activeProject.id!} />
      <TaskDashboard projectId={activeProject.id!} />
    </div>
  );
};
