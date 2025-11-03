const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export interface Bio {
  id: number;
  type: string;
  blurb: string;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface TimelineEntry {
  id: number;
  type: string;
  year: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

// Bio API
export const fetchBio = async (type: string): Promise<Bio> => {
  const response = await fetch(`${API_URL}/api/bio/${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bio');
  }
  return response.json();
};

// Timeline API
export const fetchTimeline = async (type: string): Promise<TimelineEntry[]> => {
  const response = await fetch(`${API_URL}/api/timeline/${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch timeline');
  }
  return response.json();
};

