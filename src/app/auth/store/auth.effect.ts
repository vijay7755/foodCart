import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as fromAuthAction from './authAction';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../user.model';
import { authService } from '../auth.service';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const HandleAuthentication = (email: string, userId: string, token: string, expirationDate: number) => {
    const expireDate = new Date(new Date().getTime() + expirationDate * 1000);
    const user = new User(email, userId, token, expireDate)
    localStorage.setItem('userData', JSON.stringify(user));
    return new fromAuthAction.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expireDate
    })
};
const HandleAuthError = (errorRes) => {
    let errorMessage = "An unknown error occured !"
    if (!errorRes.error || !errorRes.error.error) {
        return of(new fromAuthAction.AuthenticateFail(errorMessage));
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
    return of(new fromAuthAction.AuthenticateFail(errorMessage));
};


@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: authService) { }
    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(fromAuthAction.SIGNUP_START),
        switchMap((authData: fromAuthAction.SignupStart) => {
            return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.email,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.SetLogoutTimer(+resData.expiresIn * 1000)
                }),
                map(resData => {
                   return HandleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }),
                catchError(errorRes => {
                    return HandleAuthError(errorRes);
                })
            );
        })
    )

@Effect()
authLogin = this.actions$.pipe(
    ofType(fromAuthAction.LOGIN_START),
    switchMap((authData: fromAuthAction.LoginStart) => {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                tap(resData => {
                    this.authService.SetLogoutTimer(+resData.expiresIn * 1000)
                }),
                map(resData => {
                    return HandleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }),
                catchError(errorRes => {
                    return HandleAuthError(errorRes);
                })
            )
    })
);

@Effect({ dispatch: false })
authRedirect = this.actions$.pipe(
    ofType(fromAuthAction.AUTHENTICATE_SUCCESS),
    tap(() => {
        this.router.navigate(['/']);
    })
);

@Effect()
autoLogin = this.actions$.pipe(
    ofType(fromAuthAction.AUTO_LOGIN),
    map(() => {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return { type: 'DUMMY' };
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            const expirationDuration: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.authService.SetLogoutTimer(expirationDuration);
            return new fromAuthAction.AuthenticateSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }
            )
        }
        return { type: 'DUMMY' };
    })
);

@Effect({dispatch: false})
logout = this.actions$.pipe(
    ofType(fromAuthAction.LOGOUT),
    tap(() => {
        this.authService.ClearLogoutTimeout();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    })
);
}