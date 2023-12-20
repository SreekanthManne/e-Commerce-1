import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader';
import { CommmonService } from 'src/app/alerts/commmon.service';
import { ServicesService } from 'src/app/commmon/services.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit {
  activeloginuser: any;
  users: any = [];
  cartdata: any = [];
  LtQuantity: any;
  LtPrice: any;
  LtLength: any;
  spinnerStyle = Spinkit;
  currenturl: any;
  constructor(public router: Router, private apiData: ServicesService, private alerts: CommmonService) { }

  ngOnInit(): void {
    this.currenturl = window.location.origin;

    this.CartProducts();
    this.apiData.getUsers().subscribe((data: any) => {
      this.activeloginuser = localStorage.getItem('id');
      this.users = data;
    });
  }
  CartProducts() {
    this.currenturl = window.location.origin;
    this.apiData.getCarts().subscribe((data: any) => {
      this.cartdata = data;
      this.cartdata.forEach((item: any) => {
        this.LtLength = this.cartdata.length;
        this.LtQuantity = item.Quantity;
        this.LtPrice = item.CartPrice;
      });
    })
  }
  deleteCart(data: any) {

    this.apiData.deleteCartProducts(data).subscribe({
      next: (res) => {
        let response: any = res;
        this.users = response;
    //    this.alerts.showSuccess("Cart Deleted Sucessfully");
        this.CartProducts();
      }
    })
  }


  Logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
