import { injectable } from 'inversify';
import * as Domain from 'src/domain/v1';
import { nanoid } from 'nanoid';

@injectable()
export class PasswordSaltGenerator extends Domain.PasswordSaltGenerator {
    async generateUserPasswordSalt(): Promise<Domain.UserPasswordSalt> {
        return Domain.UserPasswordSalt.create(nanoid());
    }
}
