export class UserEncryptedPassword {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string): UserEncryptedPassword {
        const trimmedValue = value?.trim();

        if (!trimmedValue) {
            throw new Error('UserEncryptedPasswordEmpty');
        }

        return new UserEncryptedPassword(trimmedValue);
    }

    get value() {
        return this._value;
    }

    isEqual(other: UserEncryptedPassword) {
        return this.value === other.value;
    }
}
