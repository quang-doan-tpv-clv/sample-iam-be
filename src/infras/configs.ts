export const Configs = {
    database: {
        sqlite: {
            name: process.env.SQLITE_DB || 'sqlite.db',
        },
    },
    accessToken: {
        secretKey: process.env.ACCESS_TOKEN_SECRET_KEY || 'at_123456',
    },
    refreshToken: {
        secretKey: process.env.REFRESH_TOKEN_SECRET_KEY || 'rt_123456',
    },
};
