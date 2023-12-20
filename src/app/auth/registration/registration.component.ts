import { Observable, Subscriber } from 'rxjs';
import { CommmonService } from './../../alerts/commmon.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/commmon/services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  register!: FormGroup
  id: any = 0;
  url: any;
  myimage: any;
  currenturl : any;
  base64code: any;
  //  base64code!: any;
  constructor(private fb: FormBuilder, private router: Router, private api: ServicesService, private alerts: CommmonService) { }

  ngOnInit(): void {

    console.log(this.currenturl);

    this.register = this.fb.group({
      EmployeeName: ["", Validators.required],
      EmployeeDesignation: ["", Validators.required],
      password: ["", Validators.required],
      ImageUpload: ["", Validators.required],
      Notifications: [""],
      EmployeeEmail: ["", Validators.compose([Validators.required, Validators.email])]
    })
  }
  loginSubmit() {
    this.router.navigate(['login']);
  }
  onselectFile($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    this.currenturl = window.location.origin;
    //this.myimage =  "/assets/images/" + file.name;
    this.convertToBase64(file);

  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((d) => {
      this.myimage = d;
      this.base64code = d;

    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete()
    }
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }
  Register(data: any) {
    let dataTopass = {
      EmployeeName: data.EmployeeName,
      EmployeeDesignation: data.EmployeeDesignation,
      EmployeeEmail: data.EmployeeEmail,
      password: btoa(data.password),
      ImageUpload: this.myimage,
      Notifications: data.EmployeeName

    }
    this.api.addUser(dataTopass).subscribe((data: any) => {
      this.alerts.showSuccess("Registered Sucessfully");

      this.router.navigate(['login']);
    })
  }

}
