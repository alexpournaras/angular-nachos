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
    this.intervalId = window.setInterval(() => {
      if (this.automaticScroll) this.goToNextSlide();
    }, this.scrollInterval);
  }

  ngOnDestroy() {
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
