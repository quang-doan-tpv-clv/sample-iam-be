import * as Domain from 'src/domain/v1';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { Configs } from 'src/infras/configs';

@injectable()
export class RefreshTokenValueDecoder extends Domain.RefreshTokenValueDecoder {
    async decode(
        accessTokenValue: Domain.RefreshTokenValue,
    ): Promise<Domain.EntityId> {
        const jwtPayload: jwt.JwtPayload = jwt.verify(
            accessTokenValue.value,
            Configs.refreshToken.secretKey,
        ) as jwt.JwtPayload;

        return Domain.EntityId.create(jwtPayload.userId);
    }
}
