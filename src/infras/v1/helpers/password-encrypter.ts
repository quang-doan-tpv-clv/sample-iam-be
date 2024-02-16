import { injectable } from 'inversify';
import * as Domain from 'src/domain/v1';
import * as Crypto from 'crypto';

@injectable()
export class PasswordEncrypter extends Domain.PasswordEncrypter {
    async encryptPassword(
        password: Domain.UserPassword,
        salt: Domain.UserPasswordSalt,
    ): Promise<Domain.UserEncryptedPassword> {
        const hasher = Crypto.createHash('sha256');
        const encryptedPasswordValue = hasher
            .update(password.value + salt.value)
            .digest('hex');

        return Domain.UserEncryptedPassword.create(encryptedPasswordValue);
    }
}
