export class Project {
  id: number;
  name: string;
  status: "OPEN" | "CLOSED" | "PENDING" | null;

  constructor(
    id: number,
    name: string,
    status: "OPEN" | "CLOSED" | "PENDING" | null
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
