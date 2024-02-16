import * as Domain from 'src/domain/v1';

export class LoginResponse {
    private accessToken: string;
    private refreshToken: string;

    constructor(domainResponse: Domain.LoginResponse) {
        this.accessToken = domainResponse.accessTokenValue.value;
        this.refreshToken = domainResponse.refreshTokenValue.value;
    }
}
