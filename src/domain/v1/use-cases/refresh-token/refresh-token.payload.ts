import { AccessTokenValue, RefreshTokenValue } from '../../value-objects';

export type RefreshTokenRequest = {
    refreshTokenValue: RefreshTokenValue;
};

export type RefreshTokenResponse = {
    accessTokenValue: AccessTokenValue;
};
