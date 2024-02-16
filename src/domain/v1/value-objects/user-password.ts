const MAX_LENGTH = 8;
const ATLEAST_ONE_SPECIAL_CHARS_REGEX = /[^\w]+/;
const ATLEAST_ONE_DIGIT_CHARS_REGEX = /\d+/;
const ATLEAST_ONE_LOWERCASE_CHARS_REGEX = /[a-z]+/;
const ATLEAST_ONE_UPPERCASE_CHARS_REGEX = /[A-Z]+/;
const CONTAINS_NO_SPACE_CHARS_REGEX = /^\S*$/;

export class UserPassword {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string): UserPassword {
        const trimmedValue = value?.trim();

        if (!trimmedValue) {
            throw new Error('UserPasswordEmpty');
        }

        if (trimmedValue.length < MAX_LENGTH) {
            throw new Error('UserPasswordTooShort');
        }

        if (!ATLEAST_ONE_SPECIAL_CHARS_REGEX.test(trimmedValue)) {
            throw new Error('UserPasswordMissingSpecialCharacter');
        }

        if (!ATLEAST_ONE_DIGIT_CHARS_REGEX.test(trimmedValue)) {
            throw new Error('UserPasswordMissingDigitCharacter');
        }

        if (!ATLEAST_ONE_LOWERCASE_CHARS_REGEX.test(trimmedValue)) {
            throw new Error('UserPasswordMissingLowercaseCharacter');
        }

        if (!ATLEAST_ONE_UPPERCASE_CHARS_REGEX.test(trimmedValue)) {
            throw new Error('UserPasswordMissingUppercaseCharacter');
        }

        if (!CONTAINS_NO_SPACE_CHARS_REGEX.test(trimmedValue)) {
            throw new Error('UserPasswordContainsSpaceCharacter');
        }

        return new UserPassword(trimmedValue);
    }

    get value() {
        return this._value;
    }
}
