const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export interface Bio{
  id: number;
  type: string;
  blurb: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Timeline{
  image_url: any;
  id: number;
  type: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skills{
  id: number;
  type: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project{
  id: number;
  type: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  url: any;
  createdAt: Date;
  updatedAt: Date;
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
export const fetchTimeline = async (type: string): Promise<Timeline[]> => {
  const response = await fetch(`${API_URL}/api/timeline/${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch timeline');
  }
  return response.json();
};



// Skills API
export const fetchSkills = async (type: string): Promise<Skills[]> => {
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

