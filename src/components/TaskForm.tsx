import React, { useState } from "react";
import { Task } from "../services/TaskService";
import StoryService, { Story } from "../services/StoriesService";
import UserService, { User } from "../services/UserService";

interface TaskFormProps {
  taskToEdit?: Task;
  projectId: string;
  onSave: (task: Task) => void;
}

const taskForm: React.FC<TaskFormProps> = ({
  taskToEdit,
  projectId,
  onSave,
}) => {
  const [name, setName] = useState(taskToEdit ? taskToEdit.name : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [storyId, setStoryId] = useState(taskToEdit ? taskToEdit.storyId : "");
  const [stories] = useState<Story[]>(StoryService.getStories(projectId));
  const [users] = useState<User[]>(UserService.getUsers());
  const [userId, setUserId] = useState(taskToEdit ? taskToEdit.userId : "");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const task: Task = {
      ...taskToEdit!,
      name,
      description,
      projectId,
      storyId,
      userId,
    };

    setName("");
    setDescription("");
    onSave(task);
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStoryId(event.target.value);
  };
  const handleAssigneeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserId(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Story:</label>
        <select onChange={handleChange}>
          {stories.map((story) => (
            <option key={story.storyId} value={story.storyId}>
              {story.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Assignee:</label>
        <select onChange={handleAssigneeChange}>
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">{taskToEdit ? "Save" : "Add task"}</button>
    </form>
  );
};

export default taskForm;
