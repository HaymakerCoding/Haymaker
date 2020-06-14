import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  dialogRef: MatDialogRef<any>;
  @Output() scrollToAbout = new EventEmitter<any>();
  @Output() scrollToGames = new EventEmitter<any>();
  @Output() scrollToPortfolio = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  scrollToA() {
    this.scrollToAbout.next();
  }
  scrollToP() {
    this.scrollToPortfolio.next();
  }
  scrollToG() {
    this.scrollToGames.next();
  }

  openContact() {
    this.dialogRef = this.dialog.open(ContactComponent, { autoFocus: false });
    this.dialogRef.afterClosed().subscribe(response => {
      if (response && response === 200) {
        this.snackbar.open('Thank you for your interest! We will be in touch.', '', { duration: 2500 });
      } else if (response) { // so we have a response but an error
        const snackRef: MatSnackBarRef<any> = this.snackbar.open(
          'Sorry there was a problem submitting your request. Please try back later.', 'close');
        snackRef.onAction().subscribe(() => {
          this.snackbar.dismiss();
        });
      }
      // no response means dialog was just closed/cancelled
    });
  }

}
