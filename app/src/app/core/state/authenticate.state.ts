import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthenticateAction, GotJWTAction } from './authenticate.actions';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';

export class AuthenticateStateModel {
    public user: any;
    public discord: any;
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
        console.error(`API Error`, stuff);
        this.snackBar.open(`API Error ${stuff.error}`, null, { duration: 5000, panelClass: 'error' });
        return { ...ctx.getState(), user: 1 };
    }

    @Action({ type: '[Auth] Got JWT' })
    public setJWT(ctx: StateContext<AuthenticateStateModel>, { jwt }: GotJWTAction) {
        return ctx.patchState({ jwt });
    }
}
