import * as Domain from 'src/domain/v1';

export class CreateAccountResponse {
    private id: string;
    private username: string;

    constructor(domainResponse: Domain.CreateAccountResponse) {
        this.id = domainResponse.user.id.value;
        this.username = domainResponse.user.username.value;
    }
}
