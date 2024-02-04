"use server"

import {
  createSuccessResponse,
  serverAction
} from "@repo/api-helper/server/server-action-helper"
import { getClient } from "@repo/project-planner"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// export const deleteProject = async (id: number) => {
//   try {
//     const res = await getClient().project.deleteProject(id);

//     console.log(res);

//     revalidatePath("/");

//     return {
//       success: true,
//       error: null,
//     };
//   } catch (e) {
//     revalidatePath("/");
//     console.error(e);

//     return {
//       success: false,
//       error: (e as any)?.message,
//     };
//   }
// };

const schema = z.object({
  id: z.number()
})

export const deleteProject = serverAction({
  schema,
  callback: async ({ props }) => {
    const { id } = props
    console.log("Deleting project with id:", id)

    await getClient().project.deleteProject(id)
    revalidatePath("/")

    return createSuccessResponse({
      data: null,
      message: "Project deleted successfully"
    })
  }
})
