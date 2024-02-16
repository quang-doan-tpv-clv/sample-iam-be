export class AccessTokenValue {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string): AccessTokenValue {
        const trimmedValue = value?.trim();

        if (!trimmedValue) {
            throw new Error('AccessTokenValueEmpty');
        }

        return new AccessTokenValue(trimmedValue);
    }

    get value() {
        return this._value;
    }

    isEqual(other: AccessTokenValue) {
        return this.value === other.value;
    }
}
