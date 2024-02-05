import { prisma } from "@repo/database"
import { PrismaProjectRepo } from "./api/repositories/prisma/PrismaProjectRepo"
import type { Repository } from "./types"

export const getClient = (): Repository => {
  const projectRepo = new PrismaProjectRepo(prisma)

  return {
    project: projectRepo
  }
}
