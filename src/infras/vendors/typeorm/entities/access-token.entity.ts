import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_access_tokens')
export class AccessTokenEntity {
    @PrimaryColumn()
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'value' })
    value: string;

    @Column({ name: 'created_at' })
    createdDate: Date;

    @Column({ name: 'expired_at' })
    expiredDate: Date;
}
