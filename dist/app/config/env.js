import dotenv from 'dotenv';
dotenv.config();
;
const loadEnvVariable = () => {
    const requiredEnvVars = ['DB_URL', 'PORT', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'NODE_ENV'];
    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Environment variable ${key} is not set`);
        }
    });
    return {
        dbUrl: process.env.DB_URL,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,
        nodeEnv: process.env.NODE_ENV,
    };
};
export const envConfig = loadEnvVariable();
//# sourceMappingURL=env.js.map