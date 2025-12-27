import { CommonModule } from '@angular/common';
import { Component, OnInit,OnDestroy, ChangeDetectorRef} from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { RouterLink } from "@angular/router";
// import { Router } from 'express';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit,OnDestroy {
  constructor(private cdr: ChangeDetectorRef, private router:Router) {}
   private autoScrollSubscription?: Subscription;
   ngOnInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

currentSlide = 0;
  slidesPerView = 3;

 autoScrollInterval: any;
  
  slides = [
    { image: 'tally.png', title: 'Tally ERP 9', info: 'Learn professional accounting and GST billing using Tally ERP 9 for real-world business scenarios.' },
    { image: 'graphicdesign.png', title: 'Graphic Designing', info: 'Build creative visual designs for print, web, and social media using industry-standard tools.' },
    { image: 'webdev.png', title: 'Web Development', info: 'Learn to build responsive, modern websites from scratch using HTML, CSS, and JavaScript.' },
    { image: 'digitalmrkt.png', title: 'Digital Marketing', info: 'Understand digital marketing strategies to grow brands through SEO, social media, and ads.' },
    { image: 'basic.png', title: 'Basic Computer', info: 'Get comfortable with computers, operating systems, and everyday office applications.' },
    { image: 'advexcel1.png', title: 'Advanced Excel', info: 'Master advanced Excel functions and data analysis techniques for business intelligence.' },
    { image: 'adca.png', title: 'ADCA', info: 'Learn advanced computer applications and digital skills for professional productivity.' },
    { image: 'cpp.png', title: 'C++ Programming', info: 'Explore object-oriented programming concepts and build robust software applications.' },
    { image: 'python.png', title: 'Python Programming', info: 'Learn Python programming fundamentals and apply them to real-world projects.' },
    { image: 'autocad.png', title: 'AutoCAD', info: 'Create precise technical drawings and 3D models using industry-standard CAD software.' },
  ];

  startAutoScroll() {
     this.stopAutoScroll();
    this.autoScrollSubscription = interval(3000).subscribe(() => {
      this.cdr.detectChanges();
      this.nextSlide();
    });
  }

  stopAutoScroll() {
  if (this.autoScrollSubscription) {
    this.autoScrollSubscription.unsubscribe();
    this.autoScrollSubscription = undefined;
  }
}


  nextSlide() {
  this.currentSlide =
    this.currentSlide < this.maxSlideIndex ? this.currentSlide + 1 : 0;
}

prevSlide() {
  this.currentSlide =
    this.currentSlide > 0 ? this.currentSlide - 1 : this.maxSlideIndex;
}


  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoScroll();
    this.startAutoScroll(); // Restart auto-scroll after manual click
  }
  get maxSlideIndex() {
  return this.slides.length - this.slidesPerView;
  }
  navigate(){
    this.router.navigate(['/courses']);
  }
  navigateEnquiry(){
    this.router.navigate(['/enquiry']);
  }
}