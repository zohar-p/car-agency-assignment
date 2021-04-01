require('dotenv').config()
import { app } from "./app";
import { settings } from "./settings";

const { PORT } = settings

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})