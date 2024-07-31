import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

export const config = {
    port: process.env.PORT || 3042,
    tabelaMagento: 'magento',
    database: {
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || "3306",
        user: process.env.DB_USER || "",
        password: process.env.DB_PASS || "",
        name: process.env.DB_NAME || "sqlmonitoramento",
    }
};

export default config;