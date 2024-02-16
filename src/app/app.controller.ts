import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Query,
} from '@nestjs/common';
import {
    AuthenticateAccessTokenRequest,
    AuthenticateAccessTokenUseCase,
    CreateAccountRequest,
    CreateAccountUseCase,
    LoginRequest,
    LoginUseCase,
    LogoutRequest,
    LogoutUseCase,
    RefreshTokenRequest,
    RefreshTokenUseCase,
} from './use-cases';
import * as Di from './dependency-injection';

@Controller()
export class AppController {
    private createAccountUseCase: CreateAccountUseCase;
    private loginUseCase: LoginUseCase;
    private logoutUseCase: LogoutUseCase;
    private authenticateAccessTokenUseCase: AuthenticateAccessTokenUseCase;
    private refreshTokenUseCase: RefreshTokenUseCase;

    constructor() {
        this.createAccountUseCase = Di.Ioc.get(
            Di.InjectKeys.CreateAccountUseCase,
        );

        this.loginUseCase = Di.Ioc.get(Di.InjectKeys.LoginUseCase);

        this.logoutUseCase = Di.Ioc.get(Di.InjectKeys.LogoutUseCase);

        this.authenticateAccessTokenUseCase = Di.Ioc.get(
            Di.InjectKeys.AuthenticateAccessTokenUseCase,
        );

        this.refreshTokenUseCase = Di.Ioc.get(
            Di.InjectKeys.RefreshTokenUseCase,
        );
    }

    @Get('/hello')
    async hello(@Query() query) {
        console.log({ query });
        return { query };
    }

    @Post('/accounts')
    async createAccount(@Body() request: CreateAccountRequest) {
        console.log({ request });

        try {
            return await this.createAccountUseCase.handle(request);
        } catch (error) {
            if (error.message === 'UserExistedException') {
                throw new BadRequestException('UserExistedException');
            }

            throw error;
        }
    }

    @Post('/login')
    async login(@Body() request: LoginRequest) {
        console.log({ request });

        try {
            return await this.loginUseCase.handle(request);
        } catch (error) {
            if (error.message === 'UserNotExistsException') {
                throw new BadRequestException('UserNotExistsException');
            }

            if (error.message === 'PasswordIncorrectException') {
                throw new BadRequestException('PasswordIncorrectException');
            }

            throw error;
        }
    }

    @Post('/logout')
    async logout(@Body() request: LogoutRequest) {
        console.log({ request });

        try {
            return await this.logoutUseCase.handle(request);
        } catch (error) {
            if (error.message === 'UserNotExistsException') {
                throw new BadRequestException('UserNotExistsException');
            }

            throw error;
        }
    }

    @Post('/access-token-authentication')
    async authenticateAccessToken(
        @Body() request: AuthenticateAccessTokenRequest,
    ) {
        console.log({ request });

        try {
            return await this.authenticateAccessTokenUseCase.handle(request);
        } catch (error) {
            if (error.message === 'AccessTokenInvalid') {
                throw new BadRequestException('AccessTokenInvalid');
            }

            if (error.message === 'AccessTokenExpired') {
                throw new BadRequestException('AccessTokenExpired');
            }

            throw error;
        }
    }

    @Post('/refresh-token')
    async refreshToken(@Body() request: RefreshTokenRequest) {
        console.log({ request });

        try {
            return await this.refreshTokenUseCase.handle(request);
        } catch (error) {
            if (error.message === 'RefreshTokenInvalid') {
                throw new BadRequestException('RefreshTokenInvalid');
            }

            if (error.message === 'RefreshTokenExpired') {
                throw new BadRequestException('RefreshTokenExpired');
            }

            throw error;
        }
    }
}
