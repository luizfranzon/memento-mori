import colors from "colors/safe"
import { prisma } from "./prisma"

type CreateLogActionType = "Server Start" | "Email Send" | "Timer Update"

export async function generateLog(action: CreateLogActionType) {
  console.log(colors.green("\n- New Action: ") + `${action}`)
  await prisma.logs.create({
    data: {
      action,
    }
  })
}