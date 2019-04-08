import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlatformComponent } from './components/platform/platform.component';

@NgModule({
    declarations: [PlatformComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', pathMatch: 'full', component: PlatformComponent, children: [
                    { path: 'lfg', pathMatch: 'full' }
                ]
            }
        ])
    ]
})
export class PlatformModule { }
