import { SendSocketIOEvent, SocketIOConnected } from 'ngxs-socketio-plugin';
import { State, Action, StateContext, Selector, NgxsAfterBootstrap, actionMatcher } from '@ngxs/store';
import { GotJWTAction, GotUserProfile } from './authenticate.actions';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DiscordState } from '../interfaces/discordState.interface';

export class AuthenticateStateModel {
    public user: null | { id: number };
    public discord: null | DiscordState;
    public rsi: any;
    public jwt: string;
}

@State<AuthenticateStateModel>({
    name: 'authenticate',
    defaults: {
        user: null,
        discord: null,
        rsi: null,
        jwt: null,
    }
})
export class AuthenticateState {

    constructor(public injector: Injector, public snackBar: MatSnackBar) {

    }

    @Selector()
    static isAuthed(state: AuthenticateStateModel) {
        return Boolean(state.jwt);
    }

    @Action({ type: '[API] Api Error' })
    public displayApiError(ctx: StateContext<AuthenticateStateModel>, stuff: any) {
        this.snackBar.open(`API Error ${stuff.error}`, null, { duration: 5000, panelClass: 'error' });
        return { ...ctx.getState(), user: 1 };
    }

    @Action({ type: '[Auth] Got JWT' })
    public setJWT(ctx: StateContext<AuthenticateStateModel>, { jwt }: GotJWTAction) {
        ctx.dispatch(new SendSocketIOEvent({ token: jwt }, 'authentify'));
        return ctx.patchState({ jwt });
    }

    @Action(SocketIOConnected)
    public authentify(ctx?: StateContext<AuthenticateStateModel>): void {
        ctx.dispatch(new SendSocketIOEvent({ token: ctx.getState().jwt }, 'authentify'));

        setTimeout(() => {
            ctx.dispatch(new SendSocketIOEvent({ token: ctx.getState().jwt }, 'authentify'));

        }, 500);
    }

    @Action(GotUserProfile)
    public gotUserProfile(ctx: StateContext<AuthenticateStateModel>, action: GotUserProfile): AuthenticateStateModel {
        return ctx.patchState({ discord: action.discord });
    }
}
