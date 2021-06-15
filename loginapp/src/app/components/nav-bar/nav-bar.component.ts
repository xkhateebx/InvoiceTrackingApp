import { Component, OnInit } from '@angular/core';
import { Methods } from 'src/app/methods';
import { Invoice } from 'src/app/models/invoice';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  decode : any;





  public loggedIn=false;


  constructor(public loginService:LoginService, private methods : Methods) { }

  ngOnInit(): void {
    this.decode= this.methods.getDecodedAccessToken(localStorage.getItem("token"));


    this.loggedIn=this.loginService.isLoggedIn()
  }

  logoutUser()
  {
    this.loginService.logout()
    location.reload()
    location.href="/"
  }

  getUsername(){
    return this.decode.sub;
    
  }

}
