import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public email: string = '';
  public password: string = '';
  ngOnInit() {
  }

  onLogin(): void{
    this.authService.loginEmailUser(this.email, this.password).
    then((res) =>{
      this.onLoginRedirect();
    }).catch(this.onLoginErr);
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser().
    then((res) =>{
      this.onLoginRedirect();
    }).catch(this.onLoginErr);
    

  }

  onLoginFacebook(): void{
    this.authService.loginFacebookUser().
    then((res)=>{
      this.onLoginRedirect();
    }).catch(this.onLoginErr);
    
  }
  onLogout(): void{
    this.authService.logoutUser().
    then((res)=>{
      this.router.navigate(['user/login']);
    }).catch(this.onLoginErr);
  }

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }

  onLoginErr(): void{
    err => console.log('err', err.message);
  }
}
