import { BaseEntity } from '../entities';
import { BaseEvent } from '../events';
import { EntityId } from '../value-objects';

export abstract class BaseAggregate<Props> extends BaseEntity<Props> {
    protected _isTrackingChangesEnabled: boolean;
    protected _changeEvents: BaseEvent<any>[];

    constructor(id: EntityId | undefined, props: Props) {
        super(id, props);
        this._changeEvents = [];
    }

    get changeEvents() {
        return this._changeEvents;
    }

    enableTrackingChanges() {
        this._isTrackingChangesEnabled = true;
    }

    disableTrackingChanges() {
        this._isTrackingChangesEnabled = true;
    }

    trackChange(event: BaseEvent<any>) {
        if (!this._isTrackingChangesEnabled) {
            return;
        }

        this._changeEvents.push(event);
    }

    clearTrackedChanges() {
        this._changeEvents = [];
    }
}
