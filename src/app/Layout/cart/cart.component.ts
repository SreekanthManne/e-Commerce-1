import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader';
import { CommmonService } from 'src/app/alerts/commmon.service';
import { ServicesService } from 'src/app/commmon/services.service';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartdata: any = [];
  users: any = [];
  LtQuantity: any;
  LtPrice: any;
  LtLength: any;
  spinnerStyle = Spinkit;
  currenturl: any;

  constructor(private router: Router, private http: HttpClient, private api: ServicesService, private alerts: CommmonService) { }

  ngOnInit(): void {
    this.currenturl = window.location.origin;
    this.CartProducts();
  }

  CartProducts() {
    this.api.getCarts().subscribe((data: any) => {
      this.cartdata = data;
      console.log(this.cartdata);
      this.LtLength = 0;
      this.LtQuantity = 0;
      this.LtPrice = 0;
      this.cartdata.forEach((item: any) => {
        this.LtLength = this.cartdata.length;
      //  console.log(this.LtLength);
        this.LtQuantity = item.Quantity;
        console.log(this.LtQuantity);
        this.LtPrice += item.CartPrice;

      });
    })


  }

  deleteCart(data: any) {
    if (true) {
      this.api.deleteCartProducts(data).subscribe({
        next: (res) => {
          let response: any = res;
          this.users = response;
        
        }
      })
      this.CartProducts();
      this.router.navigate(['ḥome']);
    }
  }
}
