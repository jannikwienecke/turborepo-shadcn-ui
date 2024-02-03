import { Project } from ".";

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
}
