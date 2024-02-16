import { AccessTokenValue } from '../../value-objects';

export type LogoutRequest = {
    accessTokenValue: AccessTokenValue;
};

export type LogoutResponse = {
    success: true;
};
