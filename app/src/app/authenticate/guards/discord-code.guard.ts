import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class DiscordCode implements CanActivate {
    constructor(
        protected _router: Router,
    ) { }

    /**
     * Check if we have got a code from discord, otherwise redirect.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const code = route.queryParamMap.get('code');
        if (!code) {
            this._router.navigate(['/authenticate']);
            return false;
        }


        return true;
    }
}
