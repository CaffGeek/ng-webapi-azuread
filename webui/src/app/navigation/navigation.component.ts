import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ROLES } from '../shared/roles';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  roles = ROLES;
  userIsAuthenticated : boolean = false;
  username : string = "";
  isCollapsed : boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.isAuthenticated();
    this.username = this.authService.getUsername();  
  }

  logout() {
    this.authService.logout();
   }

  toggleCollapse() { 
    this.isCollapsed = !this.isCollapsed;
  }

}
