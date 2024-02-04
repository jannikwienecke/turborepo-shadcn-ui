"use client";

import { usePageAction } from "@repo/api-helper/client/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { atom, useAtom, useSetAtom } from "jotai";
import React from "react";
import { ProjectPageState } from "./types";

import { Button } from "@repo/ui/components/ui/button";

import { CreateNewProjectForm } from "@features/create-new-project";
import { useToast } from "@repo/ui/components/ui/toast";
import { Toaster } from "@repo/ui/components/ui/toaster";
import { addProject } from "./api/actions/addProjec";
import { deleteProject } from "./api/actions/deleteProject";
import { stateAtom, updateProjectsAtom } from "./project-page-store";

export const ProjectList = ({ projects }: ProjectPageState) => {
  const setStateAtom = useSetAtom(updateProjectsAtom);

  React.useEffect(() => {
    setStateAtom(projects);
  }, [projects, setStateAtom]);

  return (
    <>
      <ProjectListContent projects={projects} />
      <Toaster />
    </>
  );
};

const ProjectListContent = ({ projects }: ProjectPageState) => {
  const { toast } = useToast();
  const [atomState] = useAtom(stateAtom);

  const {
    execute,
    isLoading,
    success: successDelete,
  } = usePageAction({
    key: "deleteProject",
    stateAtom,
    action: deleteProject,
  });

  const { execute: addNewProject, success: successAdd } = usePageAction({
    key: "addProject",
    stateAtom,
    action: addProject,
  });

  const handleClickDelete = (id: number) => {
    execute(id, (state) => {
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== id),
      };
    });
  };

  React.useEffect(() => {
    if (successAdd) {
      toast({ title: "Success", description: "Project added successfully" });
      console.log("loading!!!");
    }
  }, [successAdd]);

  const _projects = atomState.projects?.length ? atomState.projects : projects;
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
  );
};
