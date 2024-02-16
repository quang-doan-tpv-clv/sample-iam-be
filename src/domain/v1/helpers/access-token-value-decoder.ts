import { AccessTokenValue, EntityId } from '../value-objects';

export abstract class AccessTokenValueDecoder {
    abstract decode(value: AccessTokenValue): Promise<EntityId>;
}
