import { AccessTokenEntity, RefreshTokenEntity } from '../entities';
import {
    AccessTokenAddedEvent,
    AccessTokenRemovedEvent,
    RefreshTokenAddedEvent,
    RefreshTokenRemovedEvent,
} from '../events';
import {
    AccessTokenValue,
    EntityId,
    RefreshTokenValue,
    UserEncryptedPassword,
    UserPasswordSalt,
    Username,
} from '../value-objects';
import { BaseAggregate } from './base.aggregate';

type Props = {
    username: Username;
    encryptedPassword: UserEncryptedPassword;
    passwordSalt: UserPasswordSalt;
    createdDate: Date;
    accessTokens: AccessTokenEntity[];
    refreshTokens: RefreshTokenEntity[];
};

export class UserAggregate extends BaseAggregate<Props> {
    static create(id: EntityId | undefined, props: Props): UserAggregate {
        return new UserAggregate(id, props);
    }

    get username() {
        return this.props.username;
    }

    get encryptedPassword() {
        return this.props.encryptedPassword;
    }

    get passwordSalt() {
        return this.props.passwordSalt;
    }

    get createdDate() {
        return this.props.createdDate;
    }

    get accessTokens() {
        return this.props.accessTokens;
    }

    get refreshTokens() {
        return this.props.refreshTokens;
    }

    addAccessToken(accessToken: AccessTokenEntity) {
        this.props.accessTokens.push(accessToken);

        this.trackChange(
            new AccessTokenAddedEvent({
                userId: this.id,
                accessToken,
            }),
        );
    }

    addRefreshToken(refreshToken: RefreshTokenEntity) {
        this.props.refreshTokens.push(refreshToken);

        this.trackChange(
            new RefreshTokenAddedEvent({
                userId: this.id,
                refreshToken,
            }),
        );
    }

    removeExpiredAccessTokens() {
        this.props.accessTokens = this.props.accessTokens.filter(
            (accessToken) => {
                if (!accessToken.isExpired) {
                    return true;
                }

                this.trackChange(
                    new AccessTokenRemovedEvent({
                        userId: this.id,
                        accessToken,
                    }),
                );

                return false;
            },
        );
    }

    removeExpiredRefreshTokens() {
        this.props.refreshTokens = this.props.refreshTokens.filter(
            (refreshToken) => {
                if (!refreshToken.isExpired) {
                    return true;
                }

                this.trackChange(
                    new RefreshTokenRemovedEvent({
                        userId: this.id,
                        refreshToken,
                    }),
                );

                return false;
            },
        );
    }

    ownAccessToken(accessTokenValue: AccessTokenValue) {
        return !!this.props.accessTokens.find(
            (accessToken) => accessToken.value === accessTokenValue,
        );
    }

    removeAccessToken(accessTokenValue: AccessTokenValue) {
        this.props.accessTokens = this.props.accessTokens.filter(
            (accessToken) => {
                if (accessToken.value.isEqual(accessTokenValue)) {
                    this.trackChange(
                        new AccessTokenRemovedEvent({
                            userId: this.id,
                            accessToken: accessToken,
                        }),
                    );

                    return false;
                }

                return true;
            },
        );
    }

    getAccessToken(accessTokenValue: AccessTokenValue) {
        return this.props.accessTokens.find((accessToken) =>
            accessToken.value.isEqual(accessTokenValue),
        );
    }

    getRefreshToken(refreshTokenValue: RefreshTokenValue) {
        return this.props.refreshTokens.find((refreshToken) =>
            refreshToken.value.isEqual(refreshTokenValue),
        );
    }
}
