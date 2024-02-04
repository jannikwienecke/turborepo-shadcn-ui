import { atom } from "jotai";
import { ProjectPageState } from "./types";

export const stateAtom = atom<ProjectPageState>({ projects: [] });

export const updateProjectsAtom = atom(
  null,
  (get, set, projects: ProjectPageState["projects"]) => {
    set(stateAtom, {
      ...get(stateAtom),
      projects,
    });
  },
);
