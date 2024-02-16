import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column({ name: 'username', unique: true })
    username: string;

    @Column({ name: 'encrypted_password' })
    encryptedPassword: string;

    @Column({ name: 'password_salt' })
    passwordSalt: string;

    @Column({ name: 'created_at' })
    createdDate: Date;
}
