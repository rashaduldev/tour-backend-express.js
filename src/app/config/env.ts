import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  dbUrl: string;
  port: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  nodeEnv: string;
};

const loadEnvVariable = (): EnvConfig => {
  const requiredEnvVars: string[] = ['DB_URL', 'PORT', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'NODE_ENV'];
  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is not set`);
    }
  });
  return {
    dbUrl: process.env.DB_URL as string,
    port: process.env.PORT as string,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
    nodeEnv: process.env.NODE_ENV as string,
  };
};

export const envConfig:EnvConfig = loadEnvVariable();