import * as Domain from 'src/domain/v1';

export class RefreshTokenResponse {
    private accessToken: string;

    constructor(domainResponse: Domain.RefreshTokenResponse) {
        this.accessToken = domainResponse.accessTokenValue.value;
    }
}
