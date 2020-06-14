import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Output() openContact = new EventEmitter<any>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToFaq() {
    alert('test');
    this.router.navigate(['faq']);
  }

  toggleContact() {
    this.openContact.next();
  }

}
