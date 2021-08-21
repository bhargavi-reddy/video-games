import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor{
    
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        req = req.clone({
            setHeaders: {
                "x-rapidapi-key": "",
                "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
            },
            setParams:{
                key: ''
            }
        })
        return next.handle(req);
    }
}
