import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpRequestIntercept implements HttpInterceptor {

    private baseUrl: string = 'http://localhost:9190/';

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            url: this.baseUrl + req.url,
            headers: req.headers.append('Content-Type', 'application/json')
        });
        return next.handle(req);
    }
}