import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular13-app';
  title1 = 'angular-http-spinner-loader';
  currenturl;
  constructor(private http: HttpClient, private router: Router) {
    this.currenturl = router.url;
    console.log(this.currenturl);
  }

}
