import { State, Action, StateContext, Store, Actions } from '@ngxs/store';
import { DiscordAction } from './discord.actions';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { SendWebSocketAction } from '@ngx-starter-kit/socketio-plugin';
import { Injector } from '@angular/core';
import { tap } from 'rxjs/operators';

export class DiscordStateModel {
    test: boolean;
}

@State<DiscordStateModel>({
    name: 'discord',
    defaults: {
        test: true
    }
})
export class DiscordState {
    protected static _store: Store;
    constructor(injector: Injector) {
        DiscordState._store = injector.get(Store);
    }

    @Receiver()
    static async sendCode({ payload }: EmitterAction<string>) {
        this._store.dispatch(new SendWebSocketAction({ test: 'string', code: payload }));
    }

}
