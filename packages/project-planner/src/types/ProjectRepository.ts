import type { Project } from "."

export interface ProjectRepository {
  getProjects: () => Promise<Project[]>
}
