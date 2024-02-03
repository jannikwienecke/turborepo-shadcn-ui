"use server";

import { getClient } from "@repo/project-planner";
import { revalidatePath } from "next/cache";

export const deleteProject = async (id: number) => {
  try {
    const res = await getClient().project.deleteProject(id);

    console.log(res);

    revalidatePath("/");

    return {
      success: true,
      error: null,
    };
  } catch (e) {
    revalidatePath("/");
    console.error(e);

    return {
      success: false,
      error: (e as any)?.message,
    };
  }
};
