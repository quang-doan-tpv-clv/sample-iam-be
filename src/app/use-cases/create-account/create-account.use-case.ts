import { inject, injectable } from 'inversify';
import * as Domain from 'src/domain/v1';
import * as Di from 'src/app/dependency-injection/inject-keys';
import { CreateAccountRequest } from './create-account.request';
import { CreateAccountResponse } from './create-account.response';

@injectable()
export class CreateAccountUseCase extends Domain.CreateAccountUseCase {
    constructor(
        @inject(Di.InjectKeys.UserRepository)
        userRepository: Domain.UserRepository,
        @inject(Di.InjectKeys.PasswordEncrypter)
        passwordEncrypter: Domain.PasswordEncrypter,
        @inject(Di.InjectKeys.PasswordSaltGenerator)
        passwordSaltGenerator: Domain.PasswordSaltGenerator,
    ) {
        super(userRepository, passwordEncrypter, passwordSaltGenerator);
    }

    async handle(dto: CreateAccountRequest): Promise<CreateAccountResponse> {
        const response = await super.execute({
            username: Domain.Username.create(dto.username),
            password: Domain.UserPassword.create(dto.password),
        });

        return new CreateAccountResponse(response);
    }
}
