import express from "express"
const router = express.Router()

import { prisma } from "../utils/prisma"

router.get("/logs", async (request, reply) => {
  const logs = await prisma.logs.findMany({
    orderBy: {
      runnedAt: 'desc'
    }
  })
  reply.send(logs)
})

export default router