import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/models';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  gameRating = 0
  gameId: number;
  game: Game;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(private actRoute: ActivatedRoute,
    private httpServ: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.actRoute.params.subscribe(
      (params: Params) => {
        this.gameId = params['id']
      }
    )
    this.getGameDetails(this.gameId);
  }
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    }
    else if (value > 50) {
      return '#fffa50'
    } else if (value > 30) {
      return '#f7aa38'
    } else {
      return '#ef4655'
    }
  }
  getGameDetails(id: number) {
    this.gameSub = this.httpServ.getGameDetails(id).subscribe(
      (res) => {
        this.game = res;
        setTimeout(() => {
          this.gameRating = +this.game.metacritic
        }, 1000)
      }
    )
  }
  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }
}
