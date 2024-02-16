import * as Domain from 'src/domain/v1';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { Configs } from 'src/infras/configs';

@injectable()
export class AccessTokenValueDecoder extends Domain.AccessTokenValueDecoder {
    async decode(
        accessTokenValue: Domain.AccessTokenValue,
    ): Promise<Domain.EntityId> {
        const jwtPayload: jwt.JwtPayload = jwt.verify(
            accessTokenValue.value,
            Configs.accessToken.secretKey,
        ) as jwt.JwtPayload;

        return Domain.EntityId.create(jwtPayload.userId);
    }
}
