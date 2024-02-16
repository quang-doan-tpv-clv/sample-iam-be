import { UserAggregate } from '../../aggregates';
import { UserRepository } from '../../repositories';
import { PasswordEncrypter, PasswordSaltGenerator } from '../../helpers';
import { BaseUseCase } from '../base.use-case';
import {
    CreateAccountRequest,
    CreateAccountResponse,
} from './create-account.payload';
import { UserExistedException } from '../../exceptions';

export class CreateAccountUseCase extends BaseUseCase<
    CreateAccountRequest,
    CreateAccountResponse
> {
    private _userRepository: UserRepository;
    private _passwordEncrypter: PasswordEncrypter;
    private _passwordSaltGenerator: PasswordSaltGenerator;

    constructor(
        userRepository: UserRepository,
        passwordService: PasswordEncrypter,
        saltGenerator: PasswordSaltGenerator,
    ) {
        super();
        this._userRepository = userRepository;
        this._passwordEncrypter = passwordService;
        this._passwordSaltGenerator = saltGenerator;
    }

    async execute(
        request: CreateAccountRequest,
    ): Promise<CreateAccountResponse> {
        const foundUser = await this._userRepository.getUserByUsername(
            request.username,
        );

        if (foundUser) {
            throw new UserExistedException();
        }

        const passwordSalt =
            await this._passwordSaltGenerator.generateUserPasswordSalt();

        const encryptedPassword = await this._passwordEncrypter.encryptPassword(
            request.password,
            passwordSalt,
        );

        const user = UserAggregate.create(undefined, {
            accessTokens: [],
            refreshTokens: [],
            createdDate: new Date(),
            encryptedPassword,
            passwordSalt,
            username: request.username,
        });

        await this._userRepository.addUser(user);

        return {
            user,
        };
    }
}
