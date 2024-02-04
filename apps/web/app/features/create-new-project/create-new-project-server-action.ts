"use server"

import {
  createSuccessResponse,
  serverAction
} from "@repo/api-helper/server/server-action-helper"

import { getClient } from "@repo/project-planner"
import { revalidatePath } from "next/cache"

import zod from "zod"

const createNewProjectSchema = zod.object({
  title: zod.string().min(5)
})

export const createNewProjectServerAction = serverAction({
  schema: createNewProjectSchema,
  callback: async ({ props }) => {
    const { title } = props
    const res = await getClient().project.addProject(title)

    revalidatePath("/")

    return createSuccessResponse({
      message: "Project created successfully",
      data: res
    })
  }
})
