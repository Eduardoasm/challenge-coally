import { EnvConfig } from "./config/env";
import mongoose from "mongoose";
import app from "./app";
import http from "http";
import swaggerDocs from "./utils/swagger";
 
async function initSever() {
  let connection: typeof mongoose | null = null;
  try {
    connection = await mongoose
      .connect(String(process.env.DATABASE))
      .then((conn) => {
        console.log('Connected to database');
        return conn;
      });

    mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

    const PORT = Number(EnvConfig().PORT);

    const httpServer = http.createServer(app);

    await new Promise<void>((resolve) => {
      httpServer.listen({ port: PORT }, resolve);
      swaggerDocs(app, PORT)
    });

    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  } catch (err) {
    if (connection) {
      connection.connection.close();
    }
    console.log(err);
    process.exit(1);
  }
}

initSever();
