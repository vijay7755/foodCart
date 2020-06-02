import { SharedModule } from './../shared/shared-module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ]),
        SharedModule
    ],

})

export class AuthModule {

}