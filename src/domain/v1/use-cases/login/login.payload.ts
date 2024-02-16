import {
    AccessTokenValue,
    RefreshTokenValue,
    UserPassword,
    Username,
} from '../../value-objects';

export type LoginRequest = {
    username: Username;
    password: UserPassword;
};

export type LoginResponse = {
    accessTokenValue: AccessTokenValue;
    refreshTokenValue: RefreshTokenValue;
};
