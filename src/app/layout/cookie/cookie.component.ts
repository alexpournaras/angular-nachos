import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {
  showCookie: boolean = false;

  constructor() { }

  ngOnInit() {
    // Check if cookie is accepted
    if (localStorage.getItem('cookie_accepted') != 'true') {
      this.showCookie = true;
    }
  }

  hideCookie() {
    this.showCookie = false;
  }

  acceptCookie() {
    // Set accepted cookie to local storage
    localStorage.setItem('cookie_accepted', 'true');
    this.showCookie = false;
  }
  
}
