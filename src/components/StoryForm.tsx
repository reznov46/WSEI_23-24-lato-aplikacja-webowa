import React, { useState } from "react";
import { Story } from "../services/StoriesService";

interface StoryFormProps {
  storyToEdit?: Story;
  projectId: string;
  onSave: (story: Story) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({
  storyToEdit,
  projectId,
  onSave,
}) => {
  const [name, setName] = useState(storyToEdit ? storyToEdit.name : "");
  const [description, setDescription] = useState(
    storyToEdit ? storyToEdit.description : ""
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const story: Story = { ...storyToEdit! };
    story.name = name;
    story.description = description;
    story.projectId = projectId;

    setName("");
    setDescription("");
    onSave(story);
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
      <button type="submit">{storyToEdit ? "Save" : "Add story"}</button>
    </form>
  );
};

export default StoryForm;
