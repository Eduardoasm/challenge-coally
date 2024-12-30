import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' });

const {
  PORT: PORT = 3000,
  DATABASE: DATABASE = 'mongodb+srv://eduardoasm19:edu123456@cluster0.rfekn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
} = process.env;

export const EnvConfig = () => ({
  DATABASE,
  PORT
});