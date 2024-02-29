import { peopleToSendEmail } from "../notifier/contacts"
import { resendSendMail } from "./resend-client"
import { generateLog } from "./generate-log"

resendSendMail(peopleToSendEmail)
  .then(() => {
    generateLog("Email Send")
  })