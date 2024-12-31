import * as dotenv from 'dotenv'
dotenv.config();

const {
  PORT: PORT,
  DATABASE: DATABASE
} = process.env;

export const EnvConfig = () => ({
  DATABASE,
  PORT
});