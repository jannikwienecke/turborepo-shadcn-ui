"use server";

import { getClient } from "@repo/project-planner";
import { revalidatePath } from "next/cache";

export const addProject = async (title: string) => {
  try {
    const res = await getClient().project.addProject(title);

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
