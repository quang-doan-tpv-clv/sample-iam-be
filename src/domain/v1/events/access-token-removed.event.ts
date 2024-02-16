import { AccessTokenEntity } from '../entities';
import { EntityId } from '../value-objects';
import { BaseEvent } from './base.event';

type Props = {
    userId: EntityId;
    accessToken: AccessTokenEntity;
};

export class AccessTokenRemovedEvent extends BaseEvent<Props> {
    constructor(props: Props) {
        super('AccessTokenRemovedEvent', props);
    }
}
