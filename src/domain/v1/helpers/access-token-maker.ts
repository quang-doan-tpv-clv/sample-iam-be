import { UserAggregate } from '../aggregates';
import { AccessTokenEntity } from '../entities';

export abstract class AccessTokenMaker {
    abstract makeAccessToken(user: UserAggregate): Promise<AccessTokenEntity>;
}
