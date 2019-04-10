import { JadeAction } from './jade-action.decorator';
import { AuthenticateStateModel } from './authenticate.state';
import { DiscordState } from '../interfaces/discordState.interface';


@JadeAction()
export class GotJWTAction {
    static readonly type = '[Auth] Got JWT';
    constructor(public jwt: string) { }
}

@JadeAction()
export class GotUserProfile {
    static readonly type = '[Auth] Got User Profile';

    constructor(public discord: DiscordState) { }
}
