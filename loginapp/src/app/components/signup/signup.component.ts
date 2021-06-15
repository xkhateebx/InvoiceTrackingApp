import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserService} from '../../services/user.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private _snackBar: MatSnackBar) { }
  form: any ={

    username:'',
    email:'',
    password:'',
    role:''

  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {}

  formSubmit(){
    
    console.log(this.form);

    this.userService.addUser(this.form).subscribe(
      (data)=>{
        //success
        this.isSuccessful = true;
        this.isSignUpFailed = false;
            },
      (error)=>{
        //error
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        
      
      }
                  )



  }




}
