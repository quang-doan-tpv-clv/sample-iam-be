import { EntityId } from '../value-objects';

export abstract class BaseEntity<Props> {
    private _id?: EntityId;
    private readonly _props: Props;

    protected constructor(id: EntityId | undefined, props: Props) {
        this._id = id;
        this._props = props;
    }

    set id(id: EntityId | undefined) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    protected get props() {
        return this._props;
    }
}
