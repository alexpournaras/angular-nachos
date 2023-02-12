import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CookieComponent } from './layout/cookie/cookie.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeaturedMoviesComponent } from './components/featured-movies/featured-movies.component';
import { LatestPopularComponent } from './components/latest-popular/latest-popular.component';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { PopularActorsComponent } from './components/popular-actors/popular-actors.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { MoviesFiltersComponent } from './components/movies-filters/movies-filters.component';
import { MoviesComponent } from './components/movies/movies.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';
import { PeopleFiltersComponent } from './components/people-filters/people-filters.component';
import { PeopleComponent } from './components/people/people.component';
import { NumberFormatPipe } from './number-format.pipe';
import { TextCapitalizePipe } from './text-capitalize.pipe';
import { NewsPagesComponent } from './pages/news-pages/news-pages.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { Top10PageComponent } from './pages/top10-page/top10-page.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { MovieContentComponent } from './components/movie-content/movie-content.component';
import { MovieCastComponent } from './components/movie-cast/movie-cast.component';
import { MovieSimilarComponent } from './components/movie-similar/movie-similar.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'movies', component: MoviesPageComponent },
  { path: 'movies/:id', component: MoviePageComponent },
  { path: 'people', component: PeoplePageComponent },
  { path: 'news', component: NewsPagesComponent },
  { path: 'top10', component: Top10PageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    CookieComponent,
    SliderComponent,
    FeaturedMoviesComponent,
    LatestPopularComponent,
    PopularMoviesComponent,
    PopularActorsComponent,
    MoviesPageComponent,
    MoviesFiltersComponent,
    MoviesComponent,
    PeoplePageComponent,
    PeopleFiltersComponent,
    PeopleComponent,
    NumberFormatPipe,
    TextCapitalizePipe,
    NewsPagesComponent,
    LoginPageComponent,
    RegisterPageComponent,
    Top10PageComponent,
    MoviePageComponent,
    MovieContentComponent,
    MovieCastComponent,
    MovieSimilarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
