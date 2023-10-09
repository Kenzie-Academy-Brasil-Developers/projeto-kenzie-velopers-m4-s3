import { QueryResult } from "pg";

export type Project = {
  id: number;
  name: string;
  description: string | null | undefined;
  repository: string;
  startDate: Date;
  endDate: Date;
  developerId: string;
};

export type ProjectCreate = Omit<Project, "id">;
export type ProjectRead = Project[];
export type ProjectUpdate = Partial<Project>;
export type ProjectResult = QueryResult<Project>;

export interface projectCreateWithId extends Project {
  id: number;
}

// No arquivo projects.interface.ts

export interface ProjectDetails {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate: Date | null;
  projectDeveloperName: string;
}
