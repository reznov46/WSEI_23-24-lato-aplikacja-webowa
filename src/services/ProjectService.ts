import { Project } from "../models/Project";
import UserService, { LOGGED_USER_KEY, User } from "./UserService";

const STORAGE_KEY = "projects";
const ACTIVE_PROJECT_KEY = "activeProject";

class ProjectService {
  static getProjects(): Project[] {
    const projects = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(projects ?? "[]") as Project[];
  }

  static saveProjects(projects: Project[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static getProjectById(id: string): Project | undefined {
    const projects = this.getProjects();
    return projects.find((project) => project.id === id);
  }

  static addProject(project: Project): void {
    const projects = this.getProjects();
    const loggedUserId = UserService.getLoggedUser().userId;
    project.ownerId = loggedUserId;
    project.id = Date.now().toString();
    projects.push(project);

    this.saveProjects(projects);
  }

  static updateProject(updatedProject: Project): void {
    let projects = this.getProjects();
    projects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    this.saveProjects(projects);
  }

  static deleteProject(id: string): void {
    let projects = this.getProjects();
    projects = projects.filter((project) => project.id !== id);
    const activeProjectId = localStorage.getItem(ACTIVE_PROJECT_KEY);
    if (activeProjectId === id) {
      localStorage.removeItem(ACTIVE_PROJECT_KEY);
    }
    this.saveProjects(projects);
  }

  static setAsActive(id: string): void {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  }
  static getActiveProject(): Project | undefined {
    const activeProjectId = localStorage.getItem(ACTIVE_PROJECT_KEY);
    this.getProjects();
    return this.getProjectById(activeProjectId ?? "");
  }
}

export default ProjectService;
