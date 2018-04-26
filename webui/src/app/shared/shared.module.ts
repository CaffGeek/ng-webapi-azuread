import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IfRoleDirective } from './if-role/if-role.directive';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    declarations: [
        IfRoleDirective,
    ],
    exports: [
        ReactiveFormsModule,
        IfRoleDirective,
    ],
    providers: [        
    ],
    entryComponents: [
    ],
})

export class SharedModule { }
