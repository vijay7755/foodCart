import { Router } from '@angular/router';
// import { authService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { placeHolderDirective } from '../shared/placeHolder/place-holder.directive';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './../store/appReducer';
import * as fromAuthActions from './store/authAction';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggingMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(placeHolderDirective, { static: false }) alertHost: placeHolderDirective;
  closeSub: Subscription;
  storeSubs: Subscription;

  constructor(
    // private authservice: authService,
    // private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.storeSubs = this.store.select('auth').subscribe(authState => {
      console.log("authState ", authState)
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

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

    // let authObs: Observable<AuthResponseData>;

    // this.isLoading = true;
    if (this.isLoggingMode) {
      // authObs = this.authservice.login(email, password)
      this.store.dispatch(new fromAuthActions.LoginStart({ email: email, password: password }));
    }
    else {
      // authObs = this.authservice.signUp(email, password)
      this.store.dispatch(new fromAuthActions.SignupStart({ email: email, password: password }));
      authForm.reset();
    }

    // authObs.subscribe(
    //   authResponseData => {
    //     console.log("authResponseData", authResponseData)
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);

    //   },
    //   errorRes => {
    //     this.isLoading = true;
    //     console.log("error", errorRes)
    //     this.error = errorRes;
    //     this.showErrorAlert(errorRes);
    //     this.isLoading = false;
    //   });
  }

  onHandleError() {
    this.store.dispatch(new fromAuthActions.ClearError());
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
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSubs) {
      this.storeSubs.unsubscribe();
    }
  }
}
