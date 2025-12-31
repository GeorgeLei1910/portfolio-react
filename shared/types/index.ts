// Shared TypeScript interfaces for both frontend and backend

export interface Bio {
  id: number;
  type: string;
  blurb: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Timeline {
  id: number;
  type: string;
  date: Date;
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  skills: MiniSkills[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Skills {
  id: number;
  type: string;
  skill: string;
  experience: number;
  imageUrl: string;
  subtype: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: number;
  type: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  embeddable: string | null;
  url: any;
  skills: MiniSkills[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MiniSkills{
  id: number;
  type: string;
  imageUrl: string;
}

export interface OccupationData{
  bio: Bio;
  timeline: Timeline[];
  skills: Map<string, Skills[]>;
  projects: Project[];
}
