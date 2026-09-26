import app from "./app.js";
import { ConnectDB } from "./config/db.js";

import "dotenv/config";
const PORT = process.env.PORT ?? 4002;

async function Boostrap() {
  try {
    await ConnectDB();

    app.listen(PORT, () => {
      console.log("Server running OK!!");
    });

    console.log("Server is listening on port: ", PORT);
  } catch (error) {
    console.error(error);
  }
}

void Boostrap();
