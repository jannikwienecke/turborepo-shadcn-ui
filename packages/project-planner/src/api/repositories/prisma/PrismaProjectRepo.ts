import type { PrismaClient } from "@repo/database"
import type { ProjectRepository } from "../../../types/ProjectRepository"
import type { Project } from "../../../types"

export class PrismaProjectRepo implements ProjectRepository {
  prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  async getProjects(): Promise<Project[]> {
    const projects = await this.prismaClient.project.findMany()

    return projects.map((project) => ({
      id: Number(project.id),
      name: project.title,
      status: project.status
    }))
  }

  async deleteProject(id: number): Promise<void> {
    console.log("Deleting project with id:", id)
    await this.prismaClient.project.delete({
      where: { id }
    })
  }

  async addProject(title: string): Promise<Project> {
    const project = await this.prismaClient.project.create({
      data: {
        title
      }
    })

    return {
      id: Number(project.id),
      name: project.title,
      status: project.status
    }
  }
}
