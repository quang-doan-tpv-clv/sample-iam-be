import { injectable } from 'inversify';
import * as Domain from 'src/domain/v1';
import {
    AccessTokenDao,
    RefreshTokenDao,
    UserDao,
} from 'src/infras/vendors/typeorm/daos';
import { sqliteDataSource } from '../../vendors/typeorm/data-sources';
import { UserMapper } from '../mappers';
import { v4 as Uuid } from 'uuid';

@injectable()
export class UserRepository implements Domain.UserRepository {
    private readonly _eventHandlerRegistry = {
        AccessTokenAddedEvent: this._handleAccessTokenAddedEvent,
        AccessTokenRemovedEvent: this._handleAccessTokenRemovedEvent,
        RefreshTokenAddedEvent: this._handleRefreshTokenAddedEvent,
        RefreshTokenRemovedEvent: this._handleRefreshTokenRemovedEvent,
    };

    async addUser(user: Domain.UserAggregate): Promise<void> {
        const queryRunner = sqliteDataSource.createQueryRunner();

        try {
            await queryRunner.startTransaction();

            const persist = UserMapper.mapDomainToPersist({ user });

            await UserDao.insert(persist.user);
            await AccessTokenDao.insert(persist.accessTokens);
            await RefreshTokenDao.insert(persist.refreshTokens);

            await queryRunner.commitTransaction();

            user.clearTrackedChanges();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async updateUser(user: Domain.UserAggregate): Promise<void> {
        const queryRunner = sqliteDataSource.createQueryRunner();

        try {
            await queryRunner.startTransaction();

            for (const event of user.changeEvents) {
                await this._eventHandlerRegistry[event.name]?.(event);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteUser(user: Domain.UserAggregate): Promise<void> {
        const foundUser = await UserDao.findOneBy({ id: user.id.value });

        if (!foundUser) {
            throw new Error('UserNotFound');
        }

        const queryRunner = sqliteDataSource.createQueryRunner();

        try {
            await queryRunner.startTransaction();

            await AccessTokenDao.delete({ userId: foundUser.id });
            await RefreshTokenDao.delete({ userId: foundUser.id });
            await UserDao.delete({ id: foundUser.id });

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getUserById(
        id: Domain.EntityId,
    ): Promise<Domain.UserAggregate | null> {
        const user = await UserDao.findOneBy({ id: id.value });

        if (!user) {
            return null;
        }

        const accessTokens = await AccessTokenDao.findBy({
            userId: id.value,
        });

        const refreshTokens = await RefreshTokenDao.findBy({
            userId: id.value,
        });

        const userAggregate = UserMapper.mapPersistToDomain({
            user,
            accessTokens,
            refreshTokens,
        });

        userAggregate.enableTrackingChanges();

        return userAggregate;
    }

    async getUserByUsername(
        username: Domain.Username,
    ): Promise<Domain.UserAggregate | null> {
        const user = await UserDao.findOneBy({
            username: username.value,
        });

        if (!user) {
            return null;
        }

        const accessTokens = await AccessTokenDao.findBy({
            userId: user.id,
        });

        const refreshTokens = await RefreshTokenDao.findBy({
            userId: user.id,
        });

        const userAggregate = UserMapper.mapPersistToDomain({
            user,
            accessTokens,
            refreshTokens,
        });

        userAggregate.enableTrackingChanges();

        return userAggregate;
    }

    private async _handleAccessTokenAddedEvent(
        event: Domain.AccessTokenAddedEvent,
    ) {
        const { userId, accessToken } = event.props;

        const accessTokenId = Uuid();

        await AccessTokenDao.insert({
            id: accessTokenId,
            userId: userId.value,
            value: accessToken.value.value,
            createdDate: accessToken.createdDate,
            expiredDate: accessToken.expiredDate,
        });

        accessToken.id = Domain.EntityId.create(accessTokenId);
    }

    private async _handleAccessTokenRemovedEvent(
        event: Domain.AccessTokenRemovedEvent,
    ) {
        const { userId, accessToken } = event.props;
        await AccessTokenDao.delete({
            id: accessToken.id.value,
            userId: userId.value,
        });
    }

    private async _handleRefreshTokenAddedEvent(
        event: Domain.RefreshTokenAddedEvent,
    ) {
        const { userId, refreshToken } = event.props;

        const refreshTokenId = Uuid();

        await RefreshTokenDao.insert({
            id: refreshTokenId,
            userId: userId.value,
            value: refreshToken.value.value,
            createdDate: refreshToken.createdDate,
            expiredDate: refreshToken.expiredDate,
        });

        refreshToken.id = Domain.EntityId.create(refreshTokenId);
    }

    private async _handleRefreshTokenRemovedEvent(
        event: Domain.RefreshTokenRemovedEvent,
    ) {
        const { userId, refreshToken } = event.props;
        await RefreshTokenDao.delete({
            id: refreshToken.id.value,
            userId: userId.value,
        });
    }
}
