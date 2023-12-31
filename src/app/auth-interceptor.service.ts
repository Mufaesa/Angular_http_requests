import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    
    // This code will run right before a requests leaves our application
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz'),
        })
        return next.handle(modifiedRequest).pipe(tap(event => {
            if(event.type === HttpEventType.Response) {
                console.log('Response arrived, body data:');
                console.log(event.body);
            }
        }));
    }
}