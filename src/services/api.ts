import type { Bio, Timeline, Skills, Project } from '../../shared/types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Re-export types for convenience
export type { Bio, Timeline, Skills, Project };

// Bio API
export const fetchBio = async (type: string): Promise<Bio> => {
  const response = await fetch(`${API_URL}/api/bio/${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bio');
  }
  return response.json();
};

// Timeline API
export const fetchTimeline = async (type: string): Promise<Timeline[]> => {
  const response = await fetch(`${API_URL}/api/timeline/${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch timeline');
  }
  return response.json();
};

// Skills API
export const fetchSkills = async (type: string): Promise<Map<string, Skills[]>> => {
  const response = await fetch(`${API_URL}/api/skills/${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }
  return response.json();
};

export const fetchProjects = async (type: string): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/api/projects/${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

