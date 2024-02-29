import express from "express"
const router = express.Router()

import { prisma } from "../utils/prisma"
import { add } from "date-fns"
import { generateLog } from "../utils/generate-log"

const databaseRowId = "5e05f86a-03f4-459b-9af5-71a542ae36ad"

router.get("/timer", async (request, reply) => {
  const timerEndDate = await prisma.timer.findUnique({
    where: {
      id: databaseRowId
    }
  })

  reply.send({
    "endDate": timerEndDate?.endDate,
    "updatedAt": timerEndDate?.updatedAt
  })
})

router.post("/timer", async (request, reply) => {
  const nowDate = new Date()
  const newEndDate = add(nowDate, {
    days: 7,
  })

  if (request.body?.password == process.env.UPDATETIMER_PASSWORD) {
    try {
      await prisma.timer.update({
        data: {
          endDate: newEndDate,
          updatedAt: nowDate
        },
        where: {
          id: databaseRowId
        }
      })

      generateLog("Timer Update")

      reply.send({
        newEndDate
      })
    } catch (error) {
      console.error(error)

      return reply.send(error)
    }
  }
})

export default router