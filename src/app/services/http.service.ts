import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {environment as env} from 'src/environments/environment';
import { APIResponse, Game} from '../models'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGamesList(ordering: string, search ?: string):Observable<APIResponse<Game>>{
      let params = new HttpParams().set('ordering', ordering)
      if(search){
        params = new HttpParams().set('ordering', ordering).set('search', search);
      }

      return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
        params: params
      })
  }
  getGameDetails(id: number):Observable<Game>{
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameTrailerScreenshots = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
      gameInfoRequest,
      gameTrailerRequest,
      gameTrailerScreenshots
    }).pipe(
      map((resp: any)=> {
          return {
            ...resp['gameInfoRequest'],
            screenshots: resp['gameTrailerScreenshots'].results,
            trailers: resp['gameTrailerRequest'].results


          }
      })
    )
  }
}
