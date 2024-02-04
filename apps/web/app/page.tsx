import { getClient } from "@repo/project-planner"
import { ProjectList } from "./Test"

export default async function IndexPage() {
  const client = getClient()
  const projects = await client.project.getProjects()

  return (
    <div>
      <ProjectList projects={projects} />
    </div>
  )
}
