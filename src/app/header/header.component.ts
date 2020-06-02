import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { authService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,  OnDestroy {
  isAuthenticated = false;
  authSubs: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: authService, private router: Router) { }

  ngOnInit() {
   this.authSubs = this.authService.user.subscribe(user => {
     this.isAuthenticated = !!user
   });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/auth']);

  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }
}
