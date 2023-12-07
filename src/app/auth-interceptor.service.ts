import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    
    // This code will run right before a requests leaves our application
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        console.log("The request is on its way");
        return next.handle(req);
    }
}