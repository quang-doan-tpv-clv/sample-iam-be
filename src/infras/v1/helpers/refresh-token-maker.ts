import * as Domain from 'src/domain/v1';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { Configs } from 'src/infras/configs';

const EXPIRE_DURATION = 1000 * 60 * 60 * 24;

@injectable()
export class RefreshTokenMaker extends Domain.RefreshTokenMaker {
    async makeRefreshToken(
        user: Domain.UserAggregate,
    ): Promise<Domain.RefreshTokenEntity> {
        const tokenValue = jwt.sign(
            {
                userId: user.id.value,
                username: user.username.value,
            },
            Configs.refreshToken.secretKey,
            {
                expiresIn: Date.now() + EXPIRE_DURATION,
            },
        );

        return Domain.RefreshTokenEntity.create(undefined, {
            value: Domain.RefreshTokenValue.create(tokenValue),
            createdDate: new Date(),
            expiredDate: new Date(Date.now() + EXPIRE_DURATION),
        });
    }
}
