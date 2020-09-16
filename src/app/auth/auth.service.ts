// import { environment } from './../../environments/environment';
// import { Router } from '@angular/router';
// import { User } from './user.model';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { pipe, throwError, BehaviorSubject } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './../store/appReducer';
import * as authAction from './store/authAction';

/* export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
} */

@Injectable({
    providedIn: "root"
})

export class authService {
    // errorResponse:string = null;
    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(
        // private http: HttpClient, 
        // private router: Router, 
        private store: Store<fromAppReducer.AppState>) { }

  /*  autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(new authAction.AuthenticateSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }
            ))
        }
        const expirationDuration: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        this.autoLogout(expirationDuration);
    } */

    /*signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleErrors),
            tap(res => {
                this.HandleAuthUser(res.email, res.localId, res.idToken, res.expiresIn)
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleErrors),
                tap(res => {
                    this.HandleAuthUser(res.email, res.localId, res.idToken, res.expiresIn)
                })
            );
    } */

   /* logOut() {
        // this.user.next(null);
        this.store.dispatch(new authAction.Logout());
        // this.router.navigate(['/auth']);
        // localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    } */

    SetLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new authAction.Logout());
        }, expirationDuration)
    }

    ClearLogoutTimeout() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

 /*   private HandleAuthUser(email: string, id: string, token: string, expiresIn: string) {
        const expireDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, id, token, expireDate);
        // this.user.next(user);
        this.store.dispatch(new authAction.AuthenticateSuccess({ email: email, userId: id, token: token, expirationDate: expireDate }))
        this.autoLogout(+expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        // console.log("user data: ", this.user)
    }

    private handleErrors(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occured !"
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email already exists";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "Invalid email address";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Password is incorrect";
                break;
        }
        return throwError(errorMessage)
    } */

}