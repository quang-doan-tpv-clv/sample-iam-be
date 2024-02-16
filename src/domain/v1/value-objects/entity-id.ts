export class EntityId {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string): EntityId {
        const trimmedValue = value?.trim();

        if (!trimmedValue) {
            throw new Error('EntityIdEmpty');
        }

        return new EntityId(trimmedValue);
    }

    get value() {
        return this._value;
    }
}
