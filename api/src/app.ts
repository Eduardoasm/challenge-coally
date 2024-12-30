import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import taskRouter from "./components/task/task.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/tasks', taskRouter)

app.use(errorHandler);

export default app;
