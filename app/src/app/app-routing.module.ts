import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { environment } from 'src/environments/environment';

const routes: Routes = [
    // { path: '', redirectTo: '/platform/lfg', pathMatch: 'full' },
    {
        path: 'platform',
        loadChildren: './platform/platform.module#PlatformModule',
        canActivate: [AuthGuard],
    },
    { path: 'authenticate', loadChildren: './authenticate/authenticate.module#AuthenticateModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: !environment.production })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
