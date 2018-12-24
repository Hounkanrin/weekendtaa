import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppService } from "./app.service";

@Injectable()
export class HttpRequestIntercept implements HttpInterceptor {

    private baseUrl: string = 'http://localhost:9190/';

    constructor(private appService: AppService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            url: this.baseUrl + req.url,
            headers: this.appendRequireHeaders(req)
        });
        return next.handle(req);
    }

    appendRequireHeaders(req: HttpRequest<any>): HttpHeaders {
        const newHeaders = req.headers;
        const user = this.getParamForConnexion(req);
        const key = user && user.length > 0 ? user : btoa(this.appService.getDefUser() + ':' + this.appService.getDefPass());
        return newHeaders.append('Authorization', 'Basic ' + key)
            .append('Content-Type', 'application/json');
    }

    getParamForConnexion(req: HttpRequest<any>): string {
        const url = req.url;
        let user = '';
        if (url.indexOf(this.appService.getUrlForLogin()) >= 0) { // lors de la connexion
            user = sessionStorage.getItem(this.appService.loginPassSession);
        } else if (this.appService.isConnected()) { // s'il est déja connecté
            user = sessionStorage.getItem(this.appService.sessionId);
        }
        return user;
    }


}