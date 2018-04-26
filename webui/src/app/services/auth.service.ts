import { AdalService } from './../adal/adal.service';
import { Injectable } from '@angular/core';
import { RolesService, RoleMap } from './roles.service';

@Injectable()
export class AuthService {
    roleMap: RoleMap[];

    constructor(
        private adalService: AdalService,
        private rolesService: RolesService
    ) { }

    init(adalConfig) : void {
        this.adalService.init(adalConfig);
    }

    login() : void{
        this.adalService.login();
    }

    logout() : void{
        this.adalService.logOut();
    }

    isAuthenticated(): boolean {
        return this.adalService.userInfo.authenticated;
    }

    getUsername() : string {
        return this.adalService.userInfo.username; 
    }

    getUserInfo() : any {
        return this.adalService.userInfo;
    }

    handleWindowCallback() : void {
        this.adalService.handleWindowCallback();
        var redirectTo = sessionStorage.getItem('redirectTo');
        if (redirectTo) {
            window.location.href = redirectTo;
            sessionStorage.removeItem('redirectTo');
        }
    }
    
    async loadRoleMap() {
        const response = await this.rolesService.getRoleMap().toPromise();
        return response;
    }

    async checkRoles(roles:string[]){
        if(!this.isAuthenticated()) return false;
        if(!this.roleMap || !this.roleMap.length) {
            this.roleMap = await this.loadRoleMap();
        }
        
        if(roles && roles.length > 0)
        { 
            var mappedRoles = roles.map((r:string):string => {                
                let m = this.roleMap.find(x => x.role == r);
                return m ? m.mapped : r;
            });
            
            const userHasRole = (profileRoles, routeRoles) => {
                return profileRoles && routeRoles && (routeRoles.filter(r=> profileRoles.indexOf(r) >= 0).length > 0);
            };
            return userHasRole(this.adalService.userInfo.profile.roles, mappedRoles); 
        }
        return true;         
    }

    getToken(){
        return this.adalService.userInfo.token;
    }    
}