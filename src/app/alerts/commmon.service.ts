import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommmonService {

  constructor(private toastr: ToastrService) { }
  
  // Toastr Notifications
  showSuccess(message:string) {
    this.toastr.success(message,'', {timeOut: 1000});
  }
}
