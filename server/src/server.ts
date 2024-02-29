import cors from "cors"
import express from "express"
import colors from "colors/safe"
import timerRoutes from "./routes/timer"
import logsRoutes from "./routes/log"
import { generateLog } from "./utils/generate-log"
import { CheckTime } from "./utils/timerChecker"

const port = process.env.port
const app = express()

app.use(cors())
app.use(express.json())

CheckTime()

// ROTAS
app.use("/", timerRoutes)
app.use("/", logsRoutes)

app.listen(port, async () => {
  console.log(colors.green("🚀 Server started at port: ") + `${port}`)
  if (process.env.ENVIROMENT != "development") {
    generateLog("Server Start")
  }
})