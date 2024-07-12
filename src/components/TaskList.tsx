import { Task } from "../services/TaskService";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            {task.name}
            {task.story?.name}
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.taskId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
