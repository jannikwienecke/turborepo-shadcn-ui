import { usePageAction } from "@repo/api-helper/client/index"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"

import { atom, useAtom } from "jotai"
import { stateAtom } from "../../project-page-store"
import { createNewProjectServerAction } from "./create-new-project-server-action"
import React from "react"
import { useToast } from "@repo/ui/components/ui/toast"

const newProjectAtom = atom({
  title: ""
})

export const CreateNewProjectForm = () => {
  const [newProject, setNewProject] = useAtom(newProjectAtom)
  const { toast } = useToast()

  const {
    execute,
    success: successAdd,
    error
  } = usePageAction({
    key: "addProject",
    stateAtom,
    action: createNewProjectServerAction
  })

  React.useEffect(() => {
    if (successAdd) {
      toast({ title: "Success", description: "Project added successfully" })
      console.log("loading!!!")
    }
  }, [])

  const xaaa = 1233

  React.useEffect(() => {
    if (error?.message) {
      toast({ title: "Success", description: "Project added successfully" })
    }
  }, [])

  const handleClickAddProject = () => {
    execute(
      {
        title: newProject.title
      },
      (state) => {
        return {
          ...state,
          projects: [
            ...state.projects,
            {
              id: state.projects.length + 1,
              name: newProject.title,
              status: "OPEN"
            }
          ]
        }
      }
    )
  }

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
  )
}
