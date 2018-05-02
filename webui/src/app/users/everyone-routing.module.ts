import { ROLES } from './../shared/roles';
import { AuthGuard } from './../services/auth-guard.service';
import { CanActivate } from '@angular/router/src';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: 'users', canActivate: [AuthGuard], data: { roles: [ ROLES.USER ] },
        component: UsersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule],
})

export class UsersRoutingModule { } 