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
  year: string;
  title: string;
  description: string;
  imageUrl: string;
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
  url: any;
  createdAt?: Date;
  updatedAt?: Date;
}
