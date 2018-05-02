import { ROLES } from './../shared/roles';
import { AuthGuard } from './../services/auth-guard.service';
import { CanActivate } from '@angular/router/src';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EveryoneComponent } from './everyone/everyone.component';

const routes: Routes = [
    { path: 'everyone', component: EveryoneComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule],
})

export class EveryoneRoutingModule { } 