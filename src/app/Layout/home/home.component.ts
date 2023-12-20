import { ServicesService } from 'src/app/commmon/services.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]

})
export class HomeComponent implements OnInit {
  users: any = [];
  activeloginuser: any;
  myDate: any;
  spinnerStyle = Spinkit;

  constructor(private router: Router, private apiData: ServicesService, private datePipe: DatePipe) {
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getEmployee();
  }
  getEmployee() {
    this.apiData.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
    });
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
