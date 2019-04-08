import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DiscordComponent } from './components/discord/discord.component';
import { DiscordCode } from './guards/discord-code.guard';
import { NgxsModule } from '@ngxs/store';
import { DiscordState } from './state/discord.state';

@NgModule({
    declarations: [AuthenticateComponent, DiscordComponent],
    imports: [
        CommonModule,
        MatCardModule,
        TranslateModule.forChild(),
        RouterModule.forChild([
            { path: '', component: AuthenticateComponent },
            { path: 'discord', component: DiscordComponent, canActivate: [DiscordCode] }
        ]),
        NgxsModule.forFeature([DiscordState])
    ]
})
export class AuthenticateModule { }
