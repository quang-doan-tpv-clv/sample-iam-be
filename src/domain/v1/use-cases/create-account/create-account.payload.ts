import { UserAggregate } from '../../aggregates';
import { UserPassword, Username } from '../../value-objects';

export type CreateAccountRequest = {
    username: Username;
    password: UserPassword;
};

export type CreateAccountResponse = {
    user: UserAggregate;
};
