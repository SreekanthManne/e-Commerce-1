import { Employee } from './../../alerts/Models/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/commmon/services.service';
import { CommmonService } from 'src/app/alerts/commmon.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any = [];
  anydata: any;
  edituser!: FormGroup;
  modal_id: any;
  activeloginuser: any | null;

  editflag = true;
  constructor(private router: Router, private apiData: ServicesService, private fb: FormBuilder, private alerts: CommmonService) {
    this.edituser = this.fb.group({
      EmployeeId: ["", Validators.required],
      EmployeeName: ["", Validators.required],
      EmployeeDesignation: ["", Validators.required],
      Notifications: [""],
      EmployeeEmail: ["", Validators.compose([Validators.required, Validators.email])]
    })
  }

  ngOnInit(): void {
    this.editUser(this.anydata);
    this.UpdateUser();
    this.getEmployee();
  }
  getEmployee() {
    this.apiData.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
    });
  }
  UpdateUser() {
    if (this.edituser.valid) {
      this.apiData.editUsersUpdate(this.edituser.value.EmployeeId, this.edituser.value).subscribe({
        next: (res) => {
          let response: any = res;
          this.users = response;
          this.edituser.reset();
          this.getEmployee();
          this.router.navigate(['users']);
        }
      })
    }
  }
  editUser(data: any) {
    this.getEmployee();
    for (var i = 0; i < this.users.length; i++) {
      if (data.EmployeeId == this.users[i].EmployeeId) {
        this.edituser = this.fb.group({
          EmployeeId: data.EmployeeId,
          EmployeeName: data.EmployeeName,
          EmployeeDesignation: data.EmployeeDesignation,
          EmployeeEmail: data.EmployeeEmail,
          password: this.users[i].password,
          ImageUpload: this.users[i].ImageUpload,
          Notifications: data.EmployeeName
        })
      }
    }
  }
  deleteUser(data: any) {
    if(localStorage.getItem('id') != data){
      this.apiData.deleteUSer(data).subscribe({
        next: (res) => {
          let response: any = res;
          this.users = response;
          this.edituser.reset();
          this.getEmployee();
          this.router.navigate(['users']);
        }
      })

    }
  }
}
