import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateAccountRequest {
    @IsNotEmpty()
    @Length(10)
    @Matches(/^\S*$/, { message: 'Username contains space' })
    username: string;

    @IsNotEmpty()
    @Length(8)
    @Matches(/[^\w]+/, { message: 'Password is missing one special character' })
    @Matches(/\d+/, { message: 'Password is missing one digit character' })
    @Matches(/[a-z]+/, {
        message: 'Password is missing one lowercase character',
    })
    @Matches(/[A-Z]+/, {
        message: 'Password is missing one uppercase character',
    })
    @Matches(/^\S*$/, { message: 'Password contains space' })
    password: string;
}
