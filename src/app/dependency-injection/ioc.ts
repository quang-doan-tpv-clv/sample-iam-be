import * as Domain from 'src/domain/v1';
import * as Infras from 'src/infras/v1';
import { Container } from 'inversify';
import { InjectKeys } from './inject-keys';
import {
    AuthenticateAccessTokenUseCase,
    CreateAccountUseCase,
    LoginUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
} from '../use-cases';

const Ioc = new Container({
    skipBaseClassChecks: true,
});

Ioc.bind<Domain.UserRepository>(InjectKeys.UserRepository).to(
    Infras.UserRepository,
);

Ioc.bind<Domain.PasswordEncrypter>(InjectKeys.PasswordEncrypter).to(
    Infras.PasswordEncrypter,
);

Ioc.bind<Domain.PasswordSaltGenerator>(InjectKeys.PasswordSaltGenerator).to(
    Infras.PasswordSaltGenerator,
);

Ioc.bind<Domain.AccessTokenMaker>(InjectKeys.AccessTokenMaker).to(
    Infras.AccessTokenMaker,
);

Ioc.bind<Domain.AccessTokenValueDecoder>(InjectKeys.AccessTokenValueDecoder).to(
    Infras.AccessTokenValueDecoder,
);

Ioc.bind<Domain.RefreshTokenMaker>(InjectKeys.RefreshTokenMaker).to(
    Infras.RefreshTokenMaker,
);

Ioc.bind<Domain.RefreshTokenValueDecoder>(
    InjectKeys.RefreshTokenValueDecoder,
).to(Infras.RefreshTokenValueDecoder);

Ioc.bind<CreateAccountUseCase>(InjectKeys.CreateAccountUseCase).to(
    CreateAccountUseCase,
);

Ioc.bind<LoginUseCase>(InjectKeys.LoginUseCase).to(LoginUseCase);

Ioc.bind<LogoutUseCase>(InjectKeys.LogoutUseCase).to(LogoutUseCase);

Ioc.bind<RefreshTokenUseCase>(InjectKeys.RefreshTokenUseCase).to(
    RefreshTokenUseCase,
);

Ioc.bind<AuthenticateAccessTokenUseCase>(
    InjectKeys.AuthenticateAccessTokenUseCase,
).to(AuthenticateAccessTokenUseCase);

export { Ioc };
