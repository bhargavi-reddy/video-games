import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string;
  games: Array<Game>;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(private httpServ: HttpService,
    private actRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.routeSub = this.actRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(order: string, search?: string) {
    this.gameSub = this.httpServ.getGamesList(order, search).subscribe(
      (gameList: APIResponse<Game>) => {
        this.games = gameList.results
        console.log(this.games);
      }
    )
  }
  getGameDetails(id: number) {
    this.route.navigate(['details', id]);
  }
  
  ngOnDestroy(){
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
  }
}
