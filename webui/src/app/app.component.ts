import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

const adalConfig = {
  tenant: environment.tenant,
  clientId: environment.webApiClientId,
  postLogoutRedirectUri: environment.postLogoutRedirect
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userIsAuthenticated : boolean = false;
  
  constructor(private authService: AuthService) {
    this.authService.init(adalConfig);  
  }


  ngOnInit(): void {
    // Handle callback if this is a redirect from Azure
    this.authService.handleWindowCallback(); 

    if(!this.authService.isAuthenticated()){
      sessionStorage.setItem('redirectTo', window.location.href);
      this.authService.login();
    } 

    this.userIsAuthenticated = this.authService.isAuthenticated();
  }

}
