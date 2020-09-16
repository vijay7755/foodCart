import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { authService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './../store/appReducer';
import * as fromAuthAction from './../auth/store/authAction';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,  OnDestroy {
  isAuthenticated = false;
  authSubs: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: authService, 
    private router: Router,
    private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
   this.authSubs = this.store.select('auth').subscribe(authState => {
     this.isAuthenticated = !!authState.user
   });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
    // this.authService.logOut();
    this.store.dispatch(new fromAuthAction.Logout());


  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }
}
