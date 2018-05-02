import { AuthorizedHttp } from './services/authorized-http.service';
import { AuthGuard } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdalHTTPService } from './adal/adal-http.service';
import { AdalService } from './adal/adal.service';
import { AuthService } from './services/auth.service';
import { RolesService } from './services/roles.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ForbiddenComponent } from './security/forbidden/forbidden.component';

import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { EveryoneModule } from './everyone/everyone.module';
import { UsersModule } from './users/users.module';

const appRoutes: Routes = [
  { path: 'forbidden', component: ForbiddenComponent, pathMatch:'full' }, 
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ForbiddenComponent,
  ],
  exports: [
  ],
  imports: [
    BrowserModule,    
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HttpModule,
    FormsModule, 
    SharedModule,
    AdminModule,
    EveryoneModule,
    UsersModule,
  ],
  providers: [
    AdalService,
    {
      provide: AdalHTTPService,
      useFactory: AdalHTTPService.factory,
      deps: [Http, AdalService]
    },
    AuthService,
    AuthGuard,
    RolesService,
    AuthorizedHttp
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
