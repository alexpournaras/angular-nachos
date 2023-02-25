import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css']
})
export class MovieReviewsComponent implements OnInit {
  movieId: string | null = '';
  reviews: Review[] = [];
  reviewForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    title: ['', [Validators.required]],
    review: ['', [Validators.required]]
  });

  get username() { return this.reviewForm.get('username'); }
  get rating() { return this.reviewForm.get('rating'); }
  get title() { return this.reviewForm.get('title'); }
  get review() { return this.reviewForm.get('review'); }
  
  constructor(private route: ActivatedRoute, private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.updateMovieReviews();
    });
  }

  onSubmit() {
    const now: Date = new Date();
    const dateString: string = now.toISOString();
    
    let reviewData = {
      date: dateString,
      movieId: this.movieId,
      review: this.reviewForm.value.review,
      reviewer: this.reviewForm.value.username,
      score: this.reviewForm.value.rating,
      title: this.reviewForm.value.title,
    }

    this.apiService.postReview(reviewData)
      .subscribe(() => {
        this.updateMovieReviews();
        this.reviewForm.reset();
      }
    );
  }

  async updateMovieReviews() {
    const reviews = await this.apiService.getReviews();

    this.reviews = [];
    for (const review of reviews) {
      if (review.movieId == this.movieId) {
        this.reviews.push(review);
      }
    }
    
  }
}
