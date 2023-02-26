import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/movie';
import { environment } from 'src/environments/environment';

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

    // In an actual project the trailer should be in the incoming data
    // Based on the movie title and release year, it searches YoutubeAPI and returns the first result
    // This is definetely not a good practice!
    this.getYoutubeMovieTrailer('movie ' + movie?.title.replace('&', 'and') + ' ' + movie?.releaseYear + ' trailer').subscribe(data => {
      const video = data.items[0];
      this.movieTrailer = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId);
    });
  }

  getYoutubeMovieTrailer(searchTerm: string): Observable<any> {
    return this.http.get<any>(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}&type=video&key=${environment.YOUTUBE_API_KEY}`
    );
  }
}
