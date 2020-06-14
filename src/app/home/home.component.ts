import { Component, OnInit, ViewChild, ElementRef, HostListener, } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import smoothscroll from 'smoothscroll-polyfill';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(PortfolioComponent, { static: false}) portofolio: PortfolioComponent;
  @ViewChild('games', { static: false }) gamesAnchor: ElementRef;
  dialogRef: MatDialogRef<any>;
  gameInView: boolean;
  onPhone: boolean;

  @HostListener('window:scroll')
  checkGameArea() {
    const position = window.pageYOffset + window.innerHeight;
    if (this.gamesAnchor && this.gamesAnchor.nativeElement.offsetTop <= position && !this.gameInView) {
      this.gameInView = true;
    }
  }

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.initBreakObserver();
    smoothscroll.polyfill();
  }

  /**
   * Listen to screen size changes, for setting phone specific settings like nav background image
   */
  initBreakObserver() {
    this.breakpointObserver.observe(
      ['(max-width: 800px)']).subscribe(result => {
        if (result.matches) {
          this.onPhone = true;
        } else {
          this.onPhone = false;
        }
      });
  }

  /**
   * Scroll to the demos that are in a child component section
   */
  scrollToDemos() {
    this.portofolio.scrollToDemos();
  }

  /**
   * Smooth scroll to an element on page
   * Note we use a third party package smoothscroll polyfill for this for cross browser compatibility
   * @param element Element to scroll to
   */
  scrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }

  /**
   * Open a dialog with the contact form. On close give feedback message
   */
  openContact() {
    this.dialogRef = this.dialog.open(ContactComponent, { autoFocus: false });
    this.dialogRef.afterClosed().subscribe(response => {
      if (response && response === 200) {
        this.snackbar.open('Thank you for your interest! We will be in touch.', 'dismiss');
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



