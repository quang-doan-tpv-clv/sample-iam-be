import { inject, injectable } from 'inversify';
import * as Domain from 'src/domain/v1';
import * as Di from 'src/app/dependency-injection/inject-keys';
import { LogoutRequest } from './logout.request';
import { LogoutResponse } from './logout.response';

@injectable()
export class LogoutUseCase extends Domain.LogoutUseCase {
    constructor(
        @inject(Di.InjectKeys.UserRepository)
        userRepository: Domain.UserRepository,
        @inject(Di.InjectKeys.AccessTokenValueDecoder)
        accessTokenValueDecoder: Domain.AccessTokenValueDecoder,
    ) {
        super(userRepository, accessTokenValueDecoder);
    }

    async handle(dto: LogoutRequest): Promise<LogoutResponse> {
        const response = await super.execute({
            accessTokenValue: Domain.AccessTokenValue.create(dto.accessToken),
        });

        return new LogoutResponse(response);
    }
}
