import { FormArray } from '@angular/forms';
import { take, exhaustMap, map } from 'rxjs/operators';
import { authService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './../store/appReducer';


export class authInterceptor implements HttpInterceptor {
    constructor(private authService: authService, private store: Store<fromAppReducer.AppState>) {}
    intercept(request: HttpRequest<any>, handler: HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                if(!user){
                    return handler.handle(request)
                }
                const modifiedRequest = request.clone(
                    {
                        params: new HttpParams().set('auth', user.token)
                      })
                return handler.handle(modifiedRequest)
            }));

    }
}