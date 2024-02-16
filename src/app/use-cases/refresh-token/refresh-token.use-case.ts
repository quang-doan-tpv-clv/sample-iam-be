import { inject, injectable } from 'inversify';
import * as Domain from 'src/domain/v1';
import * as Di from 'src/app/dependency-injection/inject-keys';
import { RefreshTokenRequest } from './refresh-token.request';
import { RefreshTokenResponse } from './refresh-token.response';

@injectable()
export class RefreshTokenUseCase extends Domain.RefreshTokenUseCase {
    constructor(
        @inject(Di.InjectKeys.UserRepository)
        userRepository: Domain.UserRepository,
        @inject(Di.InjectKeys.RefreshTokenValueDecoder)
        refreshTokenValueDecoder: Domain.RefreshTokenValueDecoder,
        @inject(Di.InjectKeys.AccessTokenMaker)
        accessTokenMaker: Domain.AccessTokenMaker,
    ) {
        super(userRepository, refreshTokenValueDecoder, accessTokenMaker);
    }

    async handle(dto: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        const response = await super.execute({
            refreshTokenValue: Domain.RefreshTokenValue.create(
                dto.refreshToken,
            ),
        });

        return new RefreshTokenResponse(response);
    }
}
