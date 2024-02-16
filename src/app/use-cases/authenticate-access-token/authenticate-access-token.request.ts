import { IsNotEmpty } from 'class-validator';

export class AuthenticateAccessTokenRequest {
    @IsNotEmpty()
    accessToken: string;
}
