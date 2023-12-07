import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class loggingServiceInterceptor implements HttpInterceptor {
    
    // This code will run right before a requests leaves our application
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Sending data from Logging interceptor: ");
        console.log("Url = " + req.url);
        console.log("Body = " + req.body);
        console.log("Method = " + req.method);
        return next.handle(req)
    }
}