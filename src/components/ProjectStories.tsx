import { useEffect, useState } from "react";
import StoryService, { Story } from "../services/StoriesService";
import StoryForm from "./StoryForm";
interface ProjectStoriesProps {
  projectId: string;
}

export const ProjectStories: React.FC<ProjectStoriesProps> = ({
  projectId,
}) => {
  const [stories, setStorys] = useState<Story[]>(
    StoryService.getStories(projectId)
  );
  const [showForm, setShowForm] = useState(false);
  const [storyToEdit, setProjectToEdit] = useState<Story | undefined>(
    undefined
  );

  useEffect(() => {
    setStorys(StoryService.getStories(projectId));
  }, [projectId]);

  const handleToggleForm = () => {
    setShowForm(!showForm);
    if (storyToEdit) {
      setProjectToEdit(undefined);
    }
  };

  const handleSave = (story: Story) => {
    if (story.storyId) {
      StoryService.updateStory(story);
    } else {
      StoryService.addStory(story);
    }
    setStorys(StoryService.getStories(projectId));
    setShowForm(false);
  };

  const onEdit = (story: Story) => {
    setProjectToEdit(story);
    setShowForm(true);
  };

  const onDelete = (storyId: string) => {
    StoryService.removeStory(storyId);
    setStorys(StoryService.getStories(projectId));
  };

  return (
    <>
      <h2>Stories</h2>
      <button onClick={handleToggleForm}>
        {showForm ? "Hide form" : "Add new"}
      </button>
      {showForm && (
        <StoryForm
          storyToEdit={storyToEdit}
          projectId={projectId}
          onSave={handleSave}
        />
      )}
      <ul>
        {stories.map((story) => (
          <li key={story.storyId}>
            <h3>{story.name}</h3>
            <p>{story.description}</p>
            <button onClick={() => onEdit(story)}>Edit</button>
            <button onClick={() => onDelete(story.storyId)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
