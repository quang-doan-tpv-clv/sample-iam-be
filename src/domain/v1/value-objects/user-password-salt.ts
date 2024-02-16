export class UserPasswordSalt {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string): UserPasswordSalt {
        const trimmedValue = value?.trim();

        if (!trimmedValue) {
            throw new Error('UserPasswordSaltEmpty');
        }

        return new UserPasswordSalt(trimmedValue);
    }

    get value() {
        return this._value;
    }
}
