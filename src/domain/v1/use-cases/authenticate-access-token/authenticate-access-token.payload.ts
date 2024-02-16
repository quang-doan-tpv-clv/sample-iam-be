import { AccessTokenValue } from '../../value-objects';

export type AuthenticateAccessTokenRequest = {
    accessTokenValue: AccessTokenValue;
};

export type AuthenticateAccessTokenResponse = {
    success: true;
};
