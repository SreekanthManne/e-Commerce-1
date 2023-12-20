import { CommmonService } from './../../alerts/commmon.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/commmon/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = FormGroup;
  users: any = [];

  constructor(private fb: FormBuilder, private router: Router, private apiData: ServicesService, private alerts: CommmonService) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
      EmployeeId: [""]
    })
    this.UsersList();
  }
  loginSubmit(data: any) {
    if (data.name) {
      let isLogin = false;
      this.users.forEach((item: any) => {
        if (item.EmployeeName == data.name && item.password == btoa(data.password)) {
          var id = item.EmployeeId;
          this.router.navigate(['home']);
          this.alerts.showSuccess("Welcome to Dashboard");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("id", id);
          isLogin = true;
        }
        this.UsersList();
      });
      if (!isLogin) {
        this.alerts.showSuccess("Please enter correct login credentials..!!");
        localStorage.clear();
      }
    }

  }
  Register() {
    this.router.navigate(['register']);
  }
  UsersList() {
    this.apiData.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
    });
  }
}
