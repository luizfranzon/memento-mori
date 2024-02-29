import cors from "cors"
import express from "express"
import { add } from "date-fns"
import { prisma } from "./utils/prisma"

const port = 8080
const app = express()

const databaseRowId = "5e05f86a-03f4-459b-9af5-71a542ae36ad"

app.use(cors())
app.use(express.json())

// ROTAS

app.get('/', (req, res) => {
  res.send('Hello World!')
})


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

app.post("/timer", async (request, reply) => {
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

  return reply.send("?")
})

app.listen(port, () => {
  console.log(`🚀 Server started at ${port}`)
})