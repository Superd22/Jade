import { AuthenticateState } from './../state/authenticate.state';
import { State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        protected _router: Router,
        protected _store: Store
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authed = this._store.selectSnapshot(AuthenticateState.isAuthed);
        console.log('prout', authed);
        if (!authed) {
            this._router.navigate(['/authenticate'], { queryParamsHandling: 'preserve' });
            return false;
        }

        return true;
    }
}
