import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuActive = false;
constructor(private router:Router){}
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }
}
