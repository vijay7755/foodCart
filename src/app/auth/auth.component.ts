import { Router } from '@angular/router';
import { authService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { placeHolderDirective } from '../shared/placeHolder/place-holder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoggingMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(placeHolderDirective, {static: false}) alertHost: placeHolderDirective;
  closeSub: Subscription; 

  constructor(private authservice: authService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver ) { }

  onSwitchMode() {
    this.isLoggingMode = !this.isLoggingMode
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return
    }
    console.log("authForm: ", authForm.value.email);
    console.log("authForm: ", authForm.value.password);
    const email: string = authForm.value.email;
    const password: string = authForm.value.password;

    let authObs: Observable<AuthResponseData>;
    
    this.isLoading = true;
    if (this.isLoggingMode) { 
      authObs = this.authservice.login(email, password)
    }
    else {
      authObs = this.authservice.signUp(email, password)
      authForm.reset();
    }
    authObs.subscribe(
      authResponseData => {
        console.log("authResponseData", authResponseData)
        this.isLoading = false;
        this.router.navigate(['/recipes']);

      },
      errorRes => {
        this.isLoading = true;
        console.log("error", errorRes)
        this.error = errorRes;
        this.showErrorAlert(errorRes);
        this.isLoading = false;
      });
  }

  onHandleError() {
    this.error = null;
  }
  private showErrorAlert(errorMsg: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();

    const dynamicCompRef = hostViewContainer.createComponent(alertCmpFactory);
    dynamicCompRef.instance.message = errorMsg;
    this.closeSub = dynamicCompRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    });
  }

  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
