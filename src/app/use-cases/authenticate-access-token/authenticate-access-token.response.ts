import * as Domain from 'src/domain/v1';

export class AuthenticateAccessTokenResponse {
    private success: boolean;

    constructor(domainResponse: Domain.AuthenticateAccessTokenResponse) {
        this.success = domainResponse.success;
    }
}
