import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ListProductsComponent } from './components/product-list/product-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormUserComponent } from './components/form-user/form-user.component'

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ListProductsComponent, canActivate: [AuthGuard]},
  { path: 'user/list', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'user/create', component: FormUserComponent, canActivate: [AuthGuard]},
  { path: 'user/edit/:id', component: FormUserComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
