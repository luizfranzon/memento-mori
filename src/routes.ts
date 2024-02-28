import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "./utils/prisma";

import { add } from "date-fns"

const databaseRowId = "5e05f86a-03f4-459b-9af5-71a542ae36ad"

type RequestBodyType = {
  password: string
}

export async function routes(app: FastifyInstance) {

  app.get("/timer", async (request, reply) => {
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

  app.post("/timer", async (request: FastifyRequest<{ Body: RequestBodyType }>, reply) => {
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

        reply.send({
          newEndDate
        })
      } catch (error) {
        console.error(error)

        return reply.send(error)
      }
    }

    return reply.code(405).send()
  })
}