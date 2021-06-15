import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  loginData={

    username:'',
    password:''
    

  }
    errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  constructor(private router: Router ,private loginService:LoginService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log('login btn clicked');

    if(this.loginData.username.trim()=='' ||
     this.loginData.username==null)
    {
      this._snackBar.open("Username is required !!" , '' , {
        duration:3000,
      });
      return;
    }
    if(this.loginData.password.trim()=='' ||
    this.loginData.password==null)
   {
     this._snackBar.open("Password is required !!" , '' , {
       duration:3000,
     });
     return;
   }

   //request

   this.loginService.generateToken(this.loginData).subscribe(
     
     (data:any)=>{
       console.log(data);

      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';

       this.loginService.loginUser(data.token)
       window.location.href="/invoices"
       

     },
     (error)=>{
      this.invalidLogin = true;
      this.loginSuccess = false;

     }
   )
  }


}
