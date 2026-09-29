import app from "../src/app.js";
import { ConnectDB } from "../src/config/database.js";

// Se ejecuta una vez por cold start; las invocaciones warm reutilizan la conexión.
await ConnectDB();

export default app;
