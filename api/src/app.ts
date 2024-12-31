import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import taskRouter from "./components/task/task.routes";
import authRouter from "./components/auth/auth.routes";
import userRouter from "./components/user/user.routes";
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://client-chi-wheat.vercel.app'],
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/tasks', taskRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler);

export default app;
