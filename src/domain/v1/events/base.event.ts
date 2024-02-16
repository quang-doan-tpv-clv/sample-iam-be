export abstract class BaseEvent<Props> {
    private readonly _name: string;
    private readonly _props: Props;

    constructor(name: string, props: Props) {
        this._name = name;
        this._props = props;
    }

    get name() {
        return this._name;
    }

    get props() {
        return this._props;
    }
}
