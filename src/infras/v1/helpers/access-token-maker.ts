import * as Domain from 'src/domain/v1';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { Configs } from 'src/infras/configs';

const EXPIRE_DURATION = 1000 * 60 * 15; // 15 mins

@injectable()
export class AccessTokenMaker extends Domain.AccessTokenMaker {
    async makeAccessToken(
        user: Domain.UserAggregate,
    ): Promise<Domain.AccessTokenEntity> {
        const tokenValue = jwt.sign(
            {
                userId: user.id.value,
                username: user.username.value,
            },
            Configs.accessToken.secretKey,
            {
                expiresIn: Date.now() + EXPIRE_DURATION,
            },
        );

        return Domain.AccessTokenEntity.create(undefined, {
            value: Domain.AccessTokenValue.create(tokenValue),
            createdDate: new Date(),
            expiredDate: new Date(Date.now() + EXPIRE_DURATION),
        });
    }
}
