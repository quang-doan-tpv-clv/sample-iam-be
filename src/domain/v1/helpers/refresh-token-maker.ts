import { UserAggregate } from '../aggregates';
import { RefreshTokenEntity } from '../entities';

export abstract class RefreshTokenMaker {
    abstract makeRefreshToken(user: UserAggregate): Promise<RefreshTokenEntity>;
}
