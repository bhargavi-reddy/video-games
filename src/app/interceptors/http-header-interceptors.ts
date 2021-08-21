import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor{
    
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        req = req.clone({
            setHeaders: {
                "x-rapidapi-key": "b585137817msh74e1713759de821p15ee56jsnf57a8a824165",
                "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com"
            },
            setParams:{
                key: 'cd3c79b7b7974e388f9a713e984844a8'
            }
        })
        return next.handle(req);
    }
}
