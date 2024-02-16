import * as Domain from 'src/domain/v1';
import {
    UserEntity,
    AccessTokenEntity,
    RefreshTokenEntity,
} from 'src/infras/vendors/typeorm/entities';
import { v4 as Uuid } from 'uuid';

export class UserMapper {
    static mapPersistToDomain(persist: {
        user: UserEntity;
        accessTokens: AccessTokenEntity[];
        refreshTokens: RefreshTokenEntity[];
    }): Domain.UserAggregate {
        return Domain.UserAggregate.create(
            Domain.EntityId.create(persist.user.id),
            {
                username: Domain.Username.create(persist.user.username),
                encryptedPassword: Domain.UserEncryptedPassword.create(
                    persist.user.encryptedPassword,
                ),
                passwordSalt: Domain.UserPasswordSalt.create(
                    persist.user.passwordSalt,
                ),
                createdDate: persist.user.createdDate,
                accessTokens: persist.accessTokens.map((accessToken) =>
                    Domain.AccessTokenEntity.create(
                        Domain.EntityId.create(accessToken.id),
                        {
                            value: Domain.AccessTokenValue.create(
                                accessToken.value,
                            ),
                            createdDate: accessToken.createdDate,
                            expiredDate: accessToken.expiredDate,
                        },
                    ),
                ),
                refreshTokens: persist.refreshTokens.map((refreshToken) =>
                    Domain.RefreshTokenEntity.create(
                        Domain.EntityId.create(refreshToken.id),
                        {
                            value: Domain.RefreshTokenValue.create(
                                refreshToken.value,
                            ),
                            createdDate: refreshToken.createdDate,
                            expiredDate: refreshToken.expiredDate,
                        },
                    ),
                ),
            },
        );
    }

    static mapDomainToPersist(domain: { user: Domain.UserAggregate }): {
        user: UserEntity;
        accessTokens: AccessTokenEntity[];
        refreshTokens: RefreshTokenEntity[];
    } {
        domain.user.id = domain.user.id || Domain.EntityId.create(Uuid());

        return {
            user: {
                id: domain.user.id.value,
                username: domain.user.username.value,
                encryptedPassword: domain.user.encryptedPassword.value,
                passwordSalt: domain.user.passwordSalt.value,
                createdDate: domain.user.createdDate,
            },
            accessTokens: domain.user.accessTokens.map((accessToken) => {
                accessToken.id =
                    accessToken.id || Domain.EntityId.create(Uuid());

                return {
                    id: accessToken.id.value,
                    userId: domain.user.id.value,
                    value: accessToken.value.value,
                    createdDate: accessToken.createdDate,
                    expiredDate: accessToken.expiredDate,
                };
            }),
            refreshTokens: domain.user.refreshTokens.map((refreshToken) => {
                refreshToken.id =
                    refreshToken.id || Domain.EntityId.create(Uuid());

                return {
                    id: refreshToken.id?.value || Uuid(),
                    userId: domain.user.id.value,
                    value: refreshToken.value.value,
                    createdDate: refreshToken.createdDate,
                    expiredDate: refreshToken.expiredDate,
                };
            }),
        };
    }
}
