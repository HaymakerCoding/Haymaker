import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  title: string;
  
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data,
    private sheetRef: MatBottomSheetRef
  ) { }

  ngOnInit() {
    switch (this.data) {
      case 0: this.title = 'Beastly Beatdown'; break;
      case 1: this.title = 'Corporate Takeover'; break;
      case 2: this.title = 'When the Sun Goes Down'; break;
    }
  }

  close() {
    this.sheetRef.dismiss();
  }

}
