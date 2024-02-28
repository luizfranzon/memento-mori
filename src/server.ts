import Fastify from "fastify"
import cors from "@fastify/cors"

import { routes } from "./routes"

const port = 3005
const app = Fastify({ logger: true })

app.register(cors, {
  origin: true
})
app.register(routes)

app.listen(port).then(() => {
  console.log(`🚀 Server running at port: ${port}`)
})
