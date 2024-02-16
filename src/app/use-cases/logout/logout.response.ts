import * as Domain from 'src/domain/v1';

export class LogoutResponse {
    private success: boolean;

    constructor(domainResponse: Domain.LogoutResponse) {
        this.success = domainResponse.success;
    }
}
