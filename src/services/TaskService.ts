import StoriesService, { Story } from "./StoriesService";
import { User } from "./UserService";

export interface Task {
  storyId: string;
  projectId: string;
  taskId: string;
  name: string;
  description: string;
  story?: Story;
  userId: string;
  user?: User;
}

const STORAGE_KEY = "tasks";
class TaskService {
  static getAllTasks(): Task[] {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(tasks ?? "[]") as Task[];
  }
  static getTasks(projectId: string): Task[] {
    const stories = StoriesService.getStories(projectId);
    const tasks = this.getAllTasks().filter(
      (task) => task.projectId === projectId
    );
    const tasksWithStories = tasks.map((task) => {
      task.story = stories.find((story) => story.storyId === task.storyId);
      return task;
    });
    console.log(tasksWithStories);

    return tasksWithStories;
  }

  static saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  static addTask(task: Task): void {
    const tasks = this.getAllTasks();
    task.taskId = Date.now().toString();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  static updateTask(updatedTask: Task): void {
    let tasks = this.getAllTasks();
    tasks = tasks.map((task) =>
      task.taskId === updatedTask.taskId ? updatedTask : task
    );
    this.saveTasks(tasks);
  }

  static deleteTask(taskId: string): void {
    let tasks = this.getAllTasks();
    tasks = tasks.filter((task) => task.taskId !== taskId);
    this.saveTasks(tasks);
  }
}
export default TaskService;
