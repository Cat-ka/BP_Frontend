import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private login: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add the jwt token(LocalStorage) request
        let authRequest = req;
        const token = this.login.getToken();
        console.log('Inside interceptor');
        if (token != null) {
            authRequest = authRequest.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
                //bacha na úvodzovky... je rozdiel medzi '' a ``
            });
        }
        return next.handle(authRequest);
    }
}

//este sme do súboru app.module.ts pridali tento riadok, respektíve len slovo do riadku
//providers: [authInterceptorProviders],
export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
];