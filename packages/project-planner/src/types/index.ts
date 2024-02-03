export interface Repository {
  project: ProjectRepository;
}

export interface Project {
  id: number;
  name: string;
  status: "OPEN" | "CLOSED" | "PENDING" | null;
}

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  deleteProject(id: number): Promise<void>;
  addProject(title: string): Promise<Project>;
}

export interface ProjectEntity {
  props: Project;

  get name(): string;
  get isOpen(): boolean;
}
