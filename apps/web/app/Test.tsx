"use client"

import { usePageAction } from "@repo/api-helper/client/index"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@repo/ui/components/ui/table"
import { useAtom, useSetAtom } from "jotai"
import React from "react"
import type { ProjectPageState } from "./types"

import { Button } from "@repo/ui/components/ui/button"

import { CreateNewProjectForm } from "@features/create-new-project"
import { Toaster } from "@repo/ui/components/ui/toaster"
import { deleteProject } from "./api/actions/deleteProject"
import { stateAtom, updateProjectsAtom } from "./project-page-store"

export const ProjectList = ({ projects }: ProjectPageState) => {
  const setStateAtom = useSetAtom(updateProjectsAtom)

  React.useEffect(() => {
    setStateAtom(projects)
  }, [projects, setStateAtom])

  return (
    <>
      <ProjectListContent projects={projects} />
      <Toaster />
    </>
  )
}

const ProjectListContent = ({ projects }: ProjectPageState) => {
  const [atomState] = useAtom(stateAtom)

  const { execute, success, error } = usePageAction({
    key: "deleteProject",
    action: deleteProject,
    stateAtom
  })

  console.log({ success, error })

  const handleClickDelete = (id: number) => {
    console.log("delete project", id)
    execute({ id }, (state) => {
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== id)
      }
    })
  }

  // fix eslint issues -> only one config
  // also for prettier

  const _projects = atomState.projects?.length ? atomState.projects : projects
  return (
    <>
      <div className="p-8 mx-auto max-w-[80%]">
        <CreateNewProjectForm />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {_projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleClickDelete(project.id)}
                    variant={"destructive"}
                  >
                    <span>Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
