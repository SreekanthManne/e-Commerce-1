import { Product } from './../../alerts/Models/product';
import { ServicesService } from 'src/app/commmon/services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommmonService } from 'src/app/alerts/commmon.service';
import { Spinkit } from 'ng-http-loader';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsdata: any;
  carttitle: any = "Add to Cart";
  datavalue: any;
  samplet: any;
  spinnerStyle = Spinkit;
  currenturl: any;

  constructor(private router: Router, private api: ServicesService, private alerts: CommmonService) { }

  ngOnInit(): void {
    this.Products();
    this.addtocart(this.datavalue);
    this.reloadCurrentRoute();
  }
  Products() {
    this.api.getProducts().subscribe((data: any) => {
      this.productsdata = data;
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
  addtocart(datavalue: any) {
    this.currenturl = window.location.origin;
    let dataTopass = {
      CartID: datavalue.ProductID,
      CartName: datavalue.ProductName,
      CartPrice: datavalue.ProductPrice,
      CartDescription: datavalue.ProductDescription,
      Quantity: datavalue.Quantity,
      CartImage: datavalue.ProductImage

    }
    this.productsdata.forEach((item: any) => {
      if (item.ProductID == datavalue.ProductID) {
        this.samplet = document.getElementById(datavalue.ProductID);
        this.samplet.innerHTML = "Remove Cart";
        this.api.cartProducts(dataTopass).subscribe((datavalue: any) => {
          this.alerts.showSuccess("Cart Added Sucessfully");
          this.router.navigate(['products']);
          this.reloadCurrentRoute();
        })
      }
    });

  }

}
