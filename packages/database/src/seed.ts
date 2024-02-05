// import type { Project } from "@prisma/client"
// import { prisma } from "./client"

// const DEFAULT_USERS = [
//   {
//     name: "Tim Apple",
//     email: "tim@apple.com"
//   }
// ] as Array<Partial<Project>>

// ;(async () => {
//   try {
//     await Promise.all(
//       DEFAULT_USERS.map((user) =>
//         prisma.project.upsert({
//           where: {
//             email: user.email!
//           },
//           update: {
//             ...user
//           },
//           create: {
//             ...user
//           }
//         })
//       )
//     )
//   } catch (error) {
//     console.error(error)
//     process.exit(1)
//   } finally {
//     await prisma.$disconnect()
//   }
// })()
