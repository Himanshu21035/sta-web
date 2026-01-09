import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
// Footer
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Saraswati Tally Academy');
   isAdminRoute = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check route on init
    this.checkAdminRoute(this.router.url);

    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkAdminRoute(event.urlAfterRedirects);
      });
  }

  private checkAdminRoute(url: string) {
    this.isAdminRoute = url.includes('/admin');
    // console.log('isAdminRoute:', this.isAdminRoute);
  }
}
