import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    declarations: [
    ],
    exports: [
        ReactiveFormsModule,
    ],
    providers: [        
    ],
    entryComponents: [
    ],
})

export class SharedModule { }
