import { Store } from '@ngxs/store';
import { DiscordState } from './../../state/discord.state';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { SendSocketIOEvent } from 'ngxs-socketio-plugin';

@Component({
    selector: 'app-discord',
    templateUrl: './discord.component.html',
    styleUrls: ['./discord.component.scss']
})
export class DiscordComponent implements OnInit {
    /** discord code we got from oauth */
    protected _code: string;

    constructor(
        protected _activatedRoute: ActivatedRoute,
        protected _store: Store
    ) {
        this._code = this._activatedRoute.snapshot.queryParamMap.get('code');
    }

    ngOnInit() {
        this._store.dispatch(new SendSocketIOEvent({ code: this._code }, 'code'));
    }

}
