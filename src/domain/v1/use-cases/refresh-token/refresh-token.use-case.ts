import { AccessTokenMaker, RefreshTokenValueDecoder } from '../../helpers';
import { UserRepository } from '../../repositories';
import { BaseUseCase } from '../base.use-case';
import {
    RefreshTokenRequest,
    RefreshTokenResponse,
} from './refresh-token.payload';

export class RefreshTokenUseCase extends BaseUseCase<
    RefreshTokenRequest,
    RefreshTokenResponse
> {
    private readonly _userRepository: UserRepository;
    private readonly _refreshTokenValueDecoder: RefreshTokenValueDecoder;
    private readonly _accessTokenMaker: AccessTokenMaker;

    constructor(
        userRepository: UserRepository,
        refreshTokenValueDecoder: RefreshTokenValueDecoder,
        accessTokenMaker: AccessTokenMaker,
    ) {
        super();
        this._userRepository = userRepository;
        this._refreshTokenValueDecoder = refreshTokenValueDecoder;
        this._accessTokenMaker = accessTokenMaker;
    }

    async execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        const userId = await this._refreshTokenValueDecoder.decode(
            request.refreshTokenValue,
        );

        const foundUser = await this._userRepository.getUserById(userId);

        if (!foundUser) {
            throw new Error('RefreshTokenInvalid');
        }

        const foundRefreshToken = foundUser.getRefreshToken(
            request.refreshTokenValue,
        );

        if (!foundRefreshToken) {
            throw new Error('RefreshTokenInvalid');
        }

        if (foundRefreshToken.isExpired) {
            throw new Error('RefreshTokenExpired');
        }

        const accessToken =
            await this._accessTokenMaker.makeAccessToken(foundUser);

        foundUser.addAccessToken(accessToken);

        await this._userRepository.updateUser(foundUser);

        return {
            accessTokenValue: accessToken.value,
        };
    }
}
