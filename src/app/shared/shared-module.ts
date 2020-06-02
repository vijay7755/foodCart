import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { loadingSpinnerComponent } from './Loading-Spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { placeHolderDirective } from './placeHolder/place-holder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
    DropdownDirective,
    loadingSpinnerComponent,
    AlertComponent,
    placeHolderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        loadingSpinnerComponent,
        AlertComponent,
        placeHolderDirective,
        CommonModule  
    ],
    entryComponents: [AlertComponent]
})

export class SharedModule {

}