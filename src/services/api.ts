import type { Bio, Timeline, Skills, Project, OccupationData } from '../../shared/types';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Re-export types for convenience
export type { Bio, Timeline, Skills, Project };

// Get all from page API
export const fetchData = async (type: string): Promise<OccupationData> => {
  const response = await fetch(`${API_URL}/${type}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
