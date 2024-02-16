import { AccessTokenValue, EntityId } from '../value-objects';
import { BaseEntity } from './base.entity';

type Props = {
    value: AccessTokenValue;
    createdDate: Date;
    expiredDate: Date;
};

export class AccessTokenEntity extends BaseEntity<Props> {
    static create(id: EntityId | undefined, props: Props): AccessTokenEntity {
        return new AccessTokenEntity(id, props);
    }

    get value() {
        return this.props.value;
    }

    get createdDate() {
        return this.props.createdDate;
    }

    get expiredDate() {
        return this.props.expiredDate;
    }

    get isExpired() {
        return this.props.expiredDate < new Date();
    }
}
