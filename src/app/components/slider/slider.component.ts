import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  automaticScroll: boolean = true;
  scrollInterval: number = 5000;
  activeSlide: number = 1;
  intervalId: any;

  // Variables for swipe events
  private initialTouchX: number | null = null;
  private initialTouchY: number | null = null;

  constructor() { }

  ngOnInit() {
    this.setSlide(1);
    // Initiallize the automatic scroll
    this.intervalId = window.setInterval(() => {
      if (this.automaticScroll) this.goToNextSlide();
    }, this.scrollInterval);
  }

  ngOnDestroy() {
    // Clear interval to eliminate automatic swipes page changed
    clearInterval(this.intervalId);
  }

  goToNextSlide() {
    this.activeSlide += 1;
    if (this.activeSlide > 3) this.activeSlide = 1;
    this.setSlide(this.activeSlide);
  }

  goToPrevSlide() {
    this.activeSlide -= 1;
    if (this.activeSlide < 1) this.activeSlide = 3;
    this.setSlide(this.activeSlide)
  }

  changeSlide(slide: number): void {
    this.activeSlide = slide;
    this.setSlide(slide);
  }

  setSlide(slide: number): void {
    if (!this.activeSlide) this.activeSlide = slide;

    // Clear all intervals
    clearInterval(this.intervalId);
    if (this.intervalId) {
      this.intervalId = setInterval(() => {
        if (this.automaticScroll) this.goToNextSlide();
      }, this.scrollInterval);
    }
      
    const slides = document.getElementsByClassName('slideshow-item');
    const dots = document.getElementsByClassName('slideshow-dot');

    if (slide > slides.length) {
      slide = 1;
    }
    if (slide < 1) {
      slide = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' slideshow-enabled', '');
    }

    (slides[slide - 1] as HTMLElement).style.display = 'block';
    dots[slide - 1].className += ' slideshow-enabled';
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.initialTouchX = event.touches[0].clientX;
    this.initialTouchY = event.touches[0].clientY;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.initialTouchX || !this.initialTouchY) return;

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;
    const xDiff = this.initialTouchX - xUp;
    const yDiff = this.initialTouchY - yUp;

    // Calculate if user wants to proceed to next or previous slide
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.goToNextSlide();
      } else {
        this.goToPrevSlide();
      }
    }

    this.initialTouchX = null;
    this.initialTouchY = null;
  }
}
