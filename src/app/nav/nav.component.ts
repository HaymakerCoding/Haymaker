import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentRoute: string;

  constructor(private router: Router) {
    router.events.subscribe(data => {
      if ( data instanceof NavigationEnd) {
        this.currentRoute = data.url;
      }
    });
   }

  ngOnInit() {

  }

}
