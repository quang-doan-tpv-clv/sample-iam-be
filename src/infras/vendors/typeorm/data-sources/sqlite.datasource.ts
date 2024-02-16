import { DataSource } from 'typeorm';
import { AccessTokenEntity, RefreshTokenEntity, UserEntity } from '../entities';
import { Configs } from 'src/infras/configs';

export const sqliteDataSource = new DataSource({
    type: 'sqlite',
    database: Configs.database.sqlite.name,
    synchronize: true,
    entities: [UserEntity, AccessTokenEntity, RefreshTokenEntity],
    logging: 'all',
});

sqliteDataSource.initialize();
