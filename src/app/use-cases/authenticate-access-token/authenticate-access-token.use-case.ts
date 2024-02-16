import { inject, injectable } from 'inversify';
import * as Domain from 'src/domain/v1';
import * as Di from 'src/app/dependency-injection/inject-keys';
import { AuthenticateAccessTokenRequest } from './authenticate-access-token.request';
import { AuthenticateAccessTokenResponse } from './authenticate-access-token.response';

@injectable()
export class AuthenticateAccessTokenUseCase extends Domain.AuthenticateAccessTokenUseCase {
    constructor(
        @inject(Di.InjectKeys.UserRepository)
        userRepository: Domain.UserRepository,
        @inject(Di.InjectKeys.AccessTokenValueDecoder)
        accessTokenValueDecoder: Domain.AccessTokenValueDecoder,
    ) {
        super(userRepository, accessTokenValueDecoder);
    }

    async handle(
        dto: AuthenticateAccessTokenRequest,
    ): Promise<AuthenticateAccessTokenResponse> {
        const response = await super.execute({
            accessTokenValue: Domain.AccessTokenValue.create(dto.accessToken),
        });

        return new AuthenticateAccessTokenResponse(response);
    }
}
