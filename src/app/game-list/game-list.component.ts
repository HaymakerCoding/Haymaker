import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GameDetailsComponent } from '../game-details/game-details.component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  constructor(
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

  }

  showGameInfo(game: GAME) {
    this.bottomSheet.open(GameDetailsComponent, { data: game });
  }

}

export enum GAME {
  BEASTLY = 0,
  CORPORATE = 1,
  SUN = 2
}
