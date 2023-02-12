import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { Movie } from '../../movie';

@Component({
  selector: 'movie-content',
  templateUrl: './movie-content.component.html',
  styleUrls: ['./movie-content.component.css']
})
export class MovieContentComponent implements OnInit {
  movieTrailer: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  movieId: string | null = '';
  movie: Movie = {
    id: '',
    cast: [],
    director: '',
    directorId: '',
    genres: [],
    imageUrl: '',
    releaseYear: 0,
    score: 0,
    summary: '',
    title: '',
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService, private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.updateMovieContent();
    });
  }

  async updateMovieContent() {
    const movies = await this.apiService.getMovies();
    const movie = movies.find(movie => movie.id === this.movieId);
    if (movie) this.movie = movie;
    this.getYoutubeMovieTrailer('movie ' + movie?.title + ' ' + movie?.releaseYear + ' trailer').subscribe(data => {
      const video = data.items[0];
      this.movieTrailer = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId);
    });
  }

  getYoutubeMovieTrailer(searchTerm: string): Observable<any> {
    const API_KEY = 'AIzaSyC0IN79OvjvNCN41PZ1SE_gLptRyWBO-RU';
    return this.http.get<any>(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}&type=video&key=${API_KEY}`
    );
  }
}
