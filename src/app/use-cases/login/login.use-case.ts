import { inject, injectable } from 'inversify';
import * as Domain from 'src/domain/v1';
import * as Di from 'src/app/dependency-injection/inject-keys';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';

@injectable()
export class LoginUseCase extends Domain.LoginUseCase {
    constructor(
        @inject(Di.InjectKeys.UserRepository)
        userRepository: Domain.UserRepository,
        @inject(Di.InjectKeys.PasswordEncrypter)
        passwordEncrypter: Domain.PasswordEncrypter,
        @inject(Di.InjectKeys.AccessTokenMaker)
        accessTokenMaker: Domain.AccessTokenMaker,
        @inject(Di.InjectKeys.RefreshTokenMaker)
        refreshTokenMaker: Domain.RefreshTokenMaker,
    ) {
        super(
            userRepository,
            passwordEncrypter,
            accessTokenMaker,
            refreshTokenMaker,
        );
    }

    async handle(dto: LoginRequest): Promise<LoginResponse> {
        const response = await super.execute({
            username: Domain.Username.create(dto.username),
            password: Domain.UserPassword.create(dto.password),
        });

        return new LoginResponse(response);
    }
}
