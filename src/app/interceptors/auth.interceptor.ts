import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {LocalStorageService} from "../utils/local-storage.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService : LocalStorageService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const {token} = this.localStorageService.get('user');
    const excludedRoutes = [
      'auth/signin',
      'auth/signup'
    ];

    const shouldExclude = excludedRoutes.some(url => req.url.includes(url));

    if (shouldExclude) {
      return next.handle(req);
    } else {
      const {token} = this.localStorageService.get('user')!;
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(clonedRequest);
    }
  }
}
