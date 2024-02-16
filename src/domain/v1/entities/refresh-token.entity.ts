import { EntityId, RefreshTokenValue } from '../value-objects';
import { BaseEntity } from './base.entity';

type Props = {
    value: RefreshTokenValue;
    createdDate: Date;
    expiredDate: Date;
};

export class RefreshTokenEntity extends BaseEntity<Props> {
    static create(id: EntityId | undefined, props: Props): RefreshTokenEntity {
        return new RefreshTokenEntity(id, props);
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
