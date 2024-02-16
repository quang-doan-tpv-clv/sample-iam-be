export class RefreshTokenValue {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string): RefreshTokenValue {
        const trimmedValue = value?.trim();

        if (!trimmedValue) {
            throw new Error('RefreshTokenValueEmpty');
        }

        return new RefreshTokenValue(trimmedValue);
    }

    get value() {
        return this._value;
    }

    isEqual(other: RefreshTokenValue) {
        return this.value === other.value;
    }
}
