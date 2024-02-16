import { RefreshTokenEntity } from '../entities';
import { EntityId } from '../value-objects';
import { BaseEvent } from './base.event';

type Props = {
    userId: EntityId;
    refreshToken: RefreshTokenEntity;
};

export class RefreshTokenRemovedEvent extends BaseEvent<Props> {
    constructor(props: Props) {
        super('RefreshTokenRemovedEvent', props);
    }
}
