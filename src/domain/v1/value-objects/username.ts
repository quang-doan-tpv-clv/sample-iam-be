const MAX_LENGTH = 8;
const CONTAINS_NO_SPACE_CHARS_REGEX = /^\S*$/;

export class Username {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string): Username {
        const trimmedValue = value?.trim();

        if (!trimmedValue) {
            throw new Error('UsernameEmpty');
        }

        if (trimmedValue.length < MAX_LENGTH) {
            throw new Error('UsernameTooShort');
        }

        if (!CONTAINS_NO_SPACE_CHARS_REGEX.test(trimmedValue)) {
            throw new Error('UsernameContainsSpaceCharacter');
        }

        return new Username(trimmedValue);
    }

    get value() {
        return this._value;
    }
}
