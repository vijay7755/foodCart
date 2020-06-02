import { ViewContainerRef, Directive } from '@angular/core';

@Directive({
    selector: '[placeHolder]'
})

export class placeHolderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {

    }
}