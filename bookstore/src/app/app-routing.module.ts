import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';
import { ListBookComponent } from './components/admin/list-book/list-book.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'offers', component: OffersComponent, canActivate: [AuthGuard]},//TODO: Solo para usuarios auth.
  {path: 'book/:id', component: DetailsBookComponent },
  {path: 'admin/list-books', component: ListBookComponent, canActivate: [AuthGuard]},//TODO: Solo para usuarios auth.
  {path: 'user/login', component: LoginComponent },
  {path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},//TODO: Solo para usuarios auth.
  {path: 'user/register', component: RegisterComponent },
  {path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
