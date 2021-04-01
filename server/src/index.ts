require('dotenv').config()
import { app } from "./app";
import { connectToDb } from "./db";
import { settings } from "./settings";

const { PORT } = settings

const main = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

main().then()
