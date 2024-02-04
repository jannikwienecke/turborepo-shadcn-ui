import { usePageAction } from "@repo/api-helper/client/index";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

import { atom, useAtom } from "jotai";
import { stateAtom } from "../../project-page-store";
import { createNewProjectServerAction } from "./create-new-project-server-action";

const newProjectAtom = atom({
  title: "",
});

export const CreateNewProjectForm = () => {
  const [newProject, setNewProject] = useAtom(newProjectAtom);

  const { execute, success: successAdd } = usePageAction({
    key: "addProject",
    stateAtom,
    action: createNewProjectServerAction,
  });

  const handleClickAddProject = () => {
    execute(newProject.title, (state) => {
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            id: state.projects.length + 1,
            name: newProject.title,
            status: "OPEN",
          },
        ],
      };
    });
  };

  return (
    <>
      <Input
        type="text"
        name="title"
        placeholder="Add Project"
        className="w-full mb-4"
        value={newProject.title}
        onChange={(e) => setNewProject({ title: e.target.value })}
      />

      <Button onClick={handleClickAddProject} variant={"default"}>
        Add Project
      </Button>
    </>
  );
};
