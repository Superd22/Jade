export class AuthenticateAction {
    static readonly type = '[Authenticate] Add item';
    constructor(public payload: string) { }
}

export class GotJWTAction {
    static readonly type = '[Auth] Got JWT';

    constructor(public jwt: string) { }
}
