import { ROLES } from './../shared/roles';
import { AuthGuard } from './../services/auth-guard.service';
import { CanActivate } from '@angular/router/src';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    { path: 'admin', canActivate: [AuthGuard], data: { roles: [ ROLES.ADMIN ] },
        component: AdminComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule],
})

export class AdminRoutingModule { } 