import { UserAggregate } from '../aggregates';
import { EntityId, Username } from '../value-objects';

export interface UserRepository {
    addUser(user: UserAggregate): Promise<void>;
    updateUser(user: UserAggregate): Promise<void>;
    deleteUser(user: UserAggregate): Promise<void>;

    getUserById(id: EntityId): Promise<UserAggregate | null>;
    getUserByUsername(username: Username): Promise<UserAggregate | null>;
}
