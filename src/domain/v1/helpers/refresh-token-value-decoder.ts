import { RefreshTokenValue, EntityId } from '../value-objects';

export abstract class RefreshTokenValueDecoder {
    abstract decode(value: RefreshTokenValue): Promise<EntityId>;
}
