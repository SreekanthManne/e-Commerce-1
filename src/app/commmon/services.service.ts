import { Cart } from './../alerts/Models/Cart';
import { Product } from './../alerts/Models/product';
import { Employee } from './../alerts/Models/employee';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
   baseUrl = environment.baseURL;
 // baseUrl = "http://localhost:61826/api";
  constructor(public http: HttpClient) { }

  getUsers() {
    return this.http.get<Employee>(this.baseUrl + "/Employee");
  }
  getProducts(){
    return this.http.get<Product>(this.baseUrl + "/Product");
  }
  getCarts(){
    return this.http.get<Cart>(this.baseUrl + "/Cart");
  }
  cartProducts(data:any){
    return this.http.post<Cart>(this.baseUrl + "/Cart", data);
  }
  deleteCartProducts(id: number) {
    return this.http.delete<Employee>(this.baseUrl + "/Cart" +"/"+ id);
  }
  deleteCart(id: number) {
    return this.http.delete<Cart>(this.baseUrl + "/Cart" +"/"+ id);
  }
  addUser(data: any) {
    debugger
    return this.http.post<Employee>(this.baseUrl + "/Employee", data);
  }

  editUsersUpdate(id: number, data: any) {
    return this.http.put(this.baseUrl + "/Employee" +"/"+ id, data);
  }
  deleteUSer(id: number) {
    return this.http.delete<Employee>(this.baseUrl + "/Employee" +"/"+ id);
  }
}
