import { UserRepository } from '../../repositories';
import { BaseUseCase } from '../base.use-case';
import { LogoutRequest, LogoutResponse } from './logout.payload';
import { UserNotExistsException } from '../../exceptions';
import { AccessTokenValueDecoder } from '../../helpers';

export class LogoutUseCase extends BaseUseCase<LogoutRequest, LogoutResponse> {
    private _userRepository: UserRepository;
    private _accessTokenValueDecoder: AccessTokenValueDecoder;

    constructor(
        userRepository: UserRepository,
        accessTokenValueDecoder: AccessTokenValueDecoder,
    ) {
        super();
        this._userRepository = userRepository;
        this._accessTokenValueDecoder = accessTokenValueDecoder;
    }

    async execute(request: LogoutRequest): Promise<LogoutResponse> {
        const userId = await this._accessTokenValueDecoder.decode(
            request.accessTokenValue,
        );

        const foundUser = await this._userRepository.getUserById(userId);

        if (!foundUser) {
            throw new UserNotExistsException();
        }

        foundUser.removeAccessToken(request.accessTokenValue);

        await this._userRepository.updateUser(foundUser);

        return {
            success: true,
        };
    }
}
