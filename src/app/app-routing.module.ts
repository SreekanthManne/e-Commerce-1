import { CartComponent } from './Layout/cart/cart.component';
import { ProductsComponent } from './Layout/products/products.component';
import { UsersComponent } from './Layout/users/users.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './Layout/home/home.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'register', component: RegistrationComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {
    path: 'users', component: UsersComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
