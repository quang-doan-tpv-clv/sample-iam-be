const InjectKeys = {
    UserRepository: Symbol('UserRepository'),
    PasswordEncrypter: Symbol('PasswordEncrypter'),
    PasswordSaltGenerator: Symbol('PasswordSaltGenerator'),
    AccessTokenMaker: Symbol('AccessTokenMaker'),
    AccessTokenValueDecoder: Symbol('AccessTokenValueDecoder'),
    RefreshTokenMaker: Symbol('RefreshTokenMaker'),
    RefreshTokenValueDecoder: Symbol('RefreshTokenValueDecoder'),
    CreateAccountUseCase: Symbol('CreateAccountUseCase'),
    LoginUseCase: Symbol('LoginUseCase'),
    LogoutUseCase: Symbol('LogoutUseCase'),
    RefreshTokenUseCase: Symbol('RefreshTokenUseCase'),
    AuthenticateAccessTokenUseCase: Symbol('AuthenticateAccessTokenUseCase'),
};

export { InjectKeys };
