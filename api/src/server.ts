import mongoose from "mongoose";
import app from "./app";
import http from "http";
import { EnvConfig } from "./config/env";
import swaggerDocs from "./utils/swagger";
 
async function initSever() {
  console.log("soy process", EnvConfig().DATABASE)
  let connection: typeof mongoose | null = null;
  try {
    connection = await mongoose
      // .connect(String(process.env.DATABASE))
      .connect('mongodb+srv://eduardoasm19:edu123456@cluster0.rfekn.mongodb.net/')
      .then((conn) => {
        console.log('Connected to database');
        return conn;
      });

    mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

    const PORT = Number(3000);

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
