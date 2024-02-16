import { AccessTokenValueDecoder } from '../../helpers';
import { UserRepository } from '../../repositories';
import { BaseUseCase } from '../base.use-case';
import {
    AuthenticateAccessTokenRequest,
    AuthenticateAccessTokenResponse,
} from './authenticate-access-token.payload';

export class AuthenticateAccessTokenUseCase extends BaseUseCase<
    AuthenticateAccessTokenRequest,
    AuthenticateAccessTokenResponse
> {
    private readonly _userRepository: UserRepository;
    private readonly _accessTokenValueDecoder: AccessTokenValueDecoder;

    constructor(
        userRepository: UserRepository,
        accessTokenValueDecoder: AccessTokenValueDecoder,
    ) {
        super();
        this._userRepository = userRepository;
        this._accessTokenValueDecoder = accessTokenValueDecoder;
    }

    async execute(
        request: AuthenticateAccessTokenRequest,
    ): Promise<AuthenticateAccessTokenResponse> {
        const userId = await this._accessTokenValueDecoder.decode(
            request.accessTokenValue,
        );

        const foundUser = await this._userRepository.getUserById(userId);

        if (!foundUser) {
            throw new Error('AccessTokenInvalid');
        }

        const foundAccessToken = foundUser.getAccessToken(
            request.accessTokenValue,
        );

        if (!foundAccessToken) {
            throw new Error('AccessTokenInvalid');
        }

        if (foundAccessToken.isExpired) {
            throw new Error('AccessTokenExpired');
        }

        foundUser.removeExpiredAccessTokens();
        foundUser.removeExpiredRefreshTokens();

        this._userRepository.updateUser(foundUser);

        return {
            success: true,
        };
    }
}
