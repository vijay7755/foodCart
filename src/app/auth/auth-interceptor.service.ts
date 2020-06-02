import { take, exhaustMap } from 'rxjs/operators';
import { authService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';

export class authInterceptor implements HttpInterceptor {
    constructor(private authService: authService) {}
    intercept(request: HttpRequest<any>, handler: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
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