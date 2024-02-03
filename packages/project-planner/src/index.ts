import { prisma } from "@repo/database";
import { PrismaProjectRepo } from "./api/repositories/prisma/PrismaProjectRepo";
import { Repository } from "./types";
import { ProjectEntityImp } from "./domain/Project";

export const getClient = (): Repository => {
  const projectRepo = new PrismaProjectRepo(prisma);

  return {
    project: projectRepo,
  };
};

export const domain = {
  projectEntity: ProjectEntityImp,
};
