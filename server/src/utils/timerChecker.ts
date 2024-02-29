import colors from "colors/safe"
import { prisma } from "../utils/prisma"
import { differenceInSeconds, format, add } from "date-fns"

export function CheckTime() {
  let differenceInSecondsBetweenNowAndEndDate = 0;

  const interval = setInterval(async () => {
    const now = new Date()
    const timerData = await prisma.timer.findUnique({
      where: {
        id: "5e05f86a-03f4-459b-9af5-71a542ae36ad"
      }
    })

    differenceInSecondsBetweenNowAndEndDate = differenceInSeconds(timerData!.endDate, now)
    console.log(colors.cyan(`Segundos restantes: `) + differenceInSecondsBetweenNowAndEndDate)

    if (differenceInSecondsBetweenNowAndEndDate < 0) {
      clearInterval(interval);
    }
  }, 1000)

}