import { GotJWTAction } from './../../../core/state/authenticate.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

    constructor(
        protected _store: Store
    ) { }

    ngOnInit() {
    }

}
