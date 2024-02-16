import { UserPasswordSalt } from '../value-objects';

export abstract class PasswordSaltGenerator {
    abstract generateUserPasswordSalt(): Promise<UserPasswordSalt>;
}
