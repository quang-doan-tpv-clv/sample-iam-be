import {
    UserEncryptedPassword,
    UserPassword,
    UserPasswordSalt,
} from '../value-objects';

export abstract class PasswordEncrypter {
    abstract encryptPassword(
        password: UserPassword,
        salt: UserPasswordSalt,
    ): Promise<UserEncryptedPassword>;
}
