import { getClient } from "@repo/project-planner";
import { ProjectList } from "./Test";
import { Button } from "@repo/ui/components/ui/button";

export default async function IndexPage() {
  const client = getClient();
  const projects = await client.project.getProjects();

  console.log("LOADED NEW !!!!");
  return (
    <div>
      <Button>Click me</Button>
      <ProjectList projects={projects || []} />
    </div>
  );
}
