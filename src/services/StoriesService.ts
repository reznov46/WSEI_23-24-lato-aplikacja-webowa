export const STORIES_KEY = "stories";

export interface Story {
  storyId: string;
  projectId: string;
  name: string;
  description: string;
}

class StoryService {
  static getStories(projectId: string) {
    const data = localStorage.getItem(STORIES_KEY);
    const stories = JSON.parse(data ?? "[]") as Story[];
    return stories.filter((story) => story.projectId === projectId);
  }

  static saveStories(stories: Story[]) {
    localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
  }

  private static getAllStories() {
    const data = localStorage.getItem(STORIES_KEY);
    return JSON.parse(data ?? "[]") as Story[];
  }

  static addStory(story: Story) {
    const stories = StoryService.getAllStories();
    story.storyId = Date.now().toString();
    stories.push(story);
    StoryService.saveStories(stories);
  }

  static removeStory(storyId: string) {
    let stories = StoryService.getAllStories();
    stories = stories.filter((story) => story.storyId !== storyId);
    StoryService.saveStories(stories);
  }

  static updateStory(updatedStory: Story): void {
    let stories = StoryService.getAllStories();
    stories = stories.map((story) =>
      story.storyId === updatedStory.storyId ? updatedStory : story
    );
    StoryService.saveStories(stories);
  }
}
export default StoryService;
