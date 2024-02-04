"use server";

import { getClient } from "@repo/project-planner";
import { revalidatePath } from "next/cache";

export const createNewProjectServerAction = async (title: string) => {
  try {
    const res = await getClient().project.addProject(title);

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
