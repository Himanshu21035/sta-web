import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/authService';
@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, RouterModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  constructor(private AuthService:AuthService){}
  logout(){
    // console.log("logout");
    this.AuthService.logout();
  }
}
