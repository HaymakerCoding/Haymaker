import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import smoothscroll from 'smoothscroll-polyfill';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  @ViewChild('demoSection') demoSection: ElementRef;
  dialogRef: MatDialogRef<any>;
  
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    smoothscroll.polyfill();

  }

  /**
   * Open a new window to a clients website
   */
  navigate(site: string) {
    window.open(site, '_blank');
  }

  scrollToDemos() {
    this.scrollTo(this.demoSection.nativeElement);
  }

  /**
   * Smooth scroll to an element on page
   * Note we use a third party package smoothscroll polyfill for this for cross browser compatibility
   * @param element Element to scroll to
   */
  scrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }

  showDatabaseDialog(dialog) {
    this.dialogRef = this.dialog.open(dialog);
  }

}
