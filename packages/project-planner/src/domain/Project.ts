import { Project, ProjectEntity } from "@project-planner/types";

export class ProjectEntityImp implements ProjectEntity {
  props: Project;

  constructor(_props: Project) {
    this.props = _props;
  }

  get name(): string {
    return this.props.name;
  }

  get isOpen(): boolean {
    return this.props.status === "OPEN";
  }
}
