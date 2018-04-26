import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective {
  @Input("ifRole") roleName : string;

  constructor( 
    private templateRef : TemplateRef<any>,
    private viewContainer : ViewContainerRef,
    private authService : AuthService ) {
  }

  ngOnInit() {
    var roles = this.roleName.split(',');
      
    this.authService.checkRoles(roles)
      .then(hasRole => { if (hasRole) this.viewContainer.createEmbeddedView(this.templateRef); } );
  }
}