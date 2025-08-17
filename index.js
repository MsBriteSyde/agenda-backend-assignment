import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import https from "https";
import { employee } from "./routes/employeeRoutes.js";
import { tasks } from "./routes/taskRoutes.js";

const app = express();
dotenv.config();

const environment = process.env.NODE_ENV;
let port = 4000;

if (environment === "production") {
  port = 443;
}

app.use(express.json());
app.use(cors());
app.use("/api/", employee);
app.use("/api/", tasks);

if (environment === "production") {
  try {
    const options = {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/jbethhof.codex-p4-2025.click/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/jbethhof.codex-p4-2025.click/fullchain.pem"
      ),
    };
    https.createServer(options, app).listen(port, () => {
      console.log(`HTTPS server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start HTTPS server:", error);
    process.exit(1);
  }
} else {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}
