import { useEffect, useState } from "react";
import TaskService, { Task } from "../services/TaskService";
import { TaskList } from "./TaskList";
import { Button } from "@mui/material";
import TaskForm from "./TaskForm";

interface TaskDashboardProps {
  projectId: string;
}
export const TaskDashboard: React.FC<TaskDashboardProps> = ({ projectId }) => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(TaskService.getTasks(projectId));
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const handleEdit = (task: Task) => {
    setShowForm(true);
    setTaskToEdit(task);
  };

  useEffect(() => {
    setTasks(TaskService.getTasks(projectId));
  }, [projectId]);

  const handleDelete = (taskId: string) => {
    TaskService.deleteTask(taskId);
    setTasks(TaskService.getTasks(projectId));
  };
  const handleToggleForm = () => {
    setShowForm(!showForm);
    if (taskToEdit) {
      setTaskToEdit(undefined);
    }
  };

  const handleSave = (task: Task) => {
    if (task.taskId) {
      TaskService.updateTask(task);
    } else {
      TaskService.addTask(task);
    }
    setTasks(TaskService.getTasks(projectId));
    setShowForm(false);
  };
  return (
    <>
      <h2>Tasks</h2>
      <Button onClick={handleToggleForm}>
        {showForm ? "Hide form" : "Add new"}{" "}
      </Button>
      {showForm && (
        <TaskForm
          projectId={projectId}
          taskToEdit={taskToEdit}
          onSave={handleSave}
        />
      )}
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};
