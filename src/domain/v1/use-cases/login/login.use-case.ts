import { UserRepository } from '../../repositories';
import {
    AccessTokenMaker,
    PasswordEncrypter,
    RefreshTokenMaker,
} from '../../helpers';
import { BaseUseCase } from '../base.use-case';
import { LoginRequest, LoginResponse } from './login.payload';
import {
    PasswordIncorrectException,
    UserNotExistsException,
} from '../../exceptions';

export class LoginUseCase extends BaseUseCase<LoginRequest, LoginResponse> {
    private _userRepository: UserRepository;
    private _passwordEncrypter: PasswordEncrypter;
    private _accessTokenMaker: AccessTokenMaker;
    private _refreshTokenMaker: RefreshTokenMaker;

    constructor(
        userRepository: UserRepository,
        passwordEncrypter: PasswordEncrypter,
        accessTokenMaker: AccessTokenMaker,
        refreshTokenMaker: RefreshTokenMaker,
    ) {
        super();
        this._userRepository = userRepository;
        this._passwordEncrypter = passwordEncrypter;
        this._accessTokenMaker = accessTokenMaker;
        this._refreshTokenMaker = refreshTokenMaker;
    }

    async execute(request: LoginRequest): Promise<LoginResponse> {
        const foundUser = await this._userRepository.getUserByUsername(
            request.username,
        );

        if (!foundUser) {
            throw new UserNotExistsException();
        }

        const encryptedPassword = await this._passwordEncrypter.encryptPassword(
            request.password,
            foundUser.passwordSalt,
        );

        if (!encryptedPassword.isEqual(foundUser.encryptedPassword)) {
            throw new PasswordIncorrectException();
        }

        const accessToken =
            await this._accessTokenMaker.makeAccessToken(foundUser);
        foundUser.addAccessToken(accessToken);

        const refreshToken =
            await this._refreshTokenMaker.makeRefreshToken(foundUser);
        foundUser.addRefreshToken(refreshToken);

        await this._userRepository.updateUser(foundUser);

        return {
            accessTokenValue: accessToken.value,
            refreshTokenValue: refreshToken.value,
        };
    }
}
