import { map, take } from 'rxjs/operators';
import { authService } from './auth.service';
import { Observable } from 'rxjs';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './../store/appReducer';

@Injectable({
    providedIn: 'root'
})
export class authGuard implements CanActivate {

    constructor(private authService: authService, private router: Router, private store: Store<fromAppReducer.AppState>) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean| UrlTree  {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            map(user => {
                // const isAuthenticated = !!user;
                const isAuthenticated = user ? true : false;
                console.log("user boolean ",isAuthenticated)
                if(isAuthenticated){
                        return true;
                }
                return this.router.createUrlTree(['/auth']);
        })
        );
    }
}