import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { ConnectSocketIO } from 'ngxs-socketio-plugin';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'jade';

    constructor(
        protected _store: Store,
        protected _translate: TranslateService
    ) {
        this._translate.setDefaultLang('fr');
        this._translate.use('fr');
    }

    public ngOnInit() {
        this._store.dispatch(new ConnectSocketIO());

    }


}
